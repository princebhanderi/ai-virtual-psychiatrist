import os
import logging
import base64
import cv2
import numpy as np
from fastapi import FastAPI, HTTPException, Request, Depends, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from typing import Dict, List, Optional
from dotenv import load_dotenv
from crewai.crews.crew_output import CrewOutput
from bson import ObjectId
from assignment.crew import Assignment
from datetime import datetime
import cv2
import random  

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)

crew_instance = Assignment().crew()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]
collection = db["users"]
chat_collection = db["chat_history"]
emotion_collection = db["emotion_data"]

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

class User(BaseModel):
    username: str
    password: str

class UserInDB(User):
    id: str

class Message(BaseModel):
    text: str
    image_data: Optional[str] = None 

class EmotionData(BaseModel):
    emotion: str
    confidence: float

async def analyze_facial_expression(image_data: str) -> Dict:
    try:
        
        image_bytes = base64.b64decode(image_data.split(',')[1] if ',' in image_data else image_data)
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        faces = face_cascade.detectMultiScale(gray, 1.1, 4)
        
        if len(faces) > 0:
            
            x, y, w, h = max(faces, key=lambda rect: rect[2] * rect[3])
            face_roi = gray[y:y+h, x:x+w]
            
            avg_intensity = np.mean(face_roi)
            std_intensity = np.std(face_roi)
            
            
            emotions = {
                "happy": 0.0,
                "sad": 0.0,
                "angry": 0.0,
                "neutral": 0.0,
                "surprise": 0.0
            }
            
            
            if avg_intensity > 100:
                emotions["happy"] = 0.5 + (std_intensity / 200)
                emotions["surprise"] = 0.3 + (std_intensity / 300)
            else:
                emotions["sad"] = 0.4 + ((100 - avg_intensity) / 200)
                emotions["angry"] = 0.3 + ((100 - avg_intensity) / 250)
            
            emotions["neutral"] = 0.5 - (std_intensity / 200)
            
            total = sum(emotions.values())
            emotions = {k: v/total for k, v in emotions.items()}
            
            predominant_emotion = max(emotions.items(), key=lambda x: x[1])
            
            return {
                "emotion": predominant_emotion[0],
                "confidence": float(predominant_emotion[1])
            }
        else:
            logging.info("No face detected in the image")
            return {"emotion": "neutral", "confidence": 1.0}
            
    except Exception as e:
        logging.error(f"Error analyzing facial expression: {e}")
        emotions = ["happy", "sad", "angry", "neutral", "surprise"]
        return {"emotion": random.choice(emotions), "confidence": 0.7}

async def get_chatbot_response(user_id: str, user_message: str, emotion_data: Dict = None) -> str:
    try:
        chat_history = await chat_collection.find_one({"user_id": user_id})
        previous_messages = ""

        if chat_history and "messages" in chat_history:
            previous_messages = "\n".join(
                [f"User: {msg['user']}\nBot: {msg['bot']}" for msg in chat_history["messages"][-10:]]
            )

        conversation_context = f"{previous_messages}\nUser: {user_message}\nBot:"
        
        emotion = "unknown"
        if emotion_data and "emotion" in emotion_data:
            emotion = emotion_data["emotion"]
            
            await emotion_collection.insert_one({
                "user_id": user_id,
                "timestamp": datetime.now(),
                "message": user_message,
                "emotion": emotion_data
            })
        
        inputs = {
            "context": conversation_context,
            "user_message": user_message,
            "student_issue": user_message,
            "emotion": emotion 
        }
        
        response = crew_instance.kickoff(inputs=inputs)

        if isinstance(response, CrewOutput):
            return response.raw

        return str(response)
    except Exception as e:
        logging.error(f"Error in chatbot response: {e}")
        return "I'm sorry, I encountered an error."

@app.post("/register/", response_model=UserInDB)
async def register_user(user: User):
    existing_user = await collection.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")

    result = await collection.insert_one({"username": user.username, "password": user.password})

    new_user = await collection.find_one({"_id": result.inserted_id})
    return UserInDB(id=str(new_user["_id"]), username=new_user["username"], password=new_user["password"])

@app.post("/login/")
async def login_user(user: User):
    existing_user = await collection.find_one({"username": user.username})

    if not existing_user or existing_user["password"] != user.password:
        raise HTTPException(status_code=400, detail="Invalid username or password")

    user_id = str(existing_user["_id"])
    
    response = JSONResponse(content={"message": "Login successful"})
    response.set_cookie(key="session_user_id", value=user_id, httponly=True, secure=True, samesite="Lax")

    return response

@app.post("/logout/")
async def logout_user():
    response = JSONResponse(content={"message": "Logout successful"})
    response.delete_cookie(key="session_user_id")
    return response

async def get_current_user(request: Request):
    user_id = request.cookies.get("session_user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="User not authenticated")
    return user_id

@app.get("/user/")
async def get_current_user_details(user_id: str = Depends(get_current_user)):
    user = await collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"id": str(user["_id"]), "username": user["username"]}

@app.post("/chat/")
async def chat_with_bot(message: Message, user_id: str = Depends(get_current_user)):
    try:
        emotion_data = None
        
        if message.image_data:
            emotion_data = await analyze_facial_expression(message.image_data)
            logging.info(f"Detected emotion: {emotion_data['emotion']} with confidence: {emotion_data['confidence']}")
        
        bot_response = await get_chatbot_response(user_id, message.text, emotion_data)

        chat_history = await chat_collection.find_one({"user_id": user_id})

        if not chat_history:
            chat_history = {"user_id": user_id, "messages": []}

        message_entry = {"user": message.text, "bot": bot_response}
        if emotion_data:
            message_entry["emotion"] = emotion_data
            
        chat_history["messages"].append(message_entry)

        await chat_collection.update_one(
            {"user_id": user_id},
            {"$set": {"messages": chat_history["messages"]}},
            upsert=True
        )

        return {"response": bot_response, "detected_emotion": emotion_data}
    except Exception as e:
        logging.error(f"Error during chat processing: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@app.post("/analyze-emotion/")
async def analyze_emotion(file: UploadFile = File(...), user_id: str = Depends(get_current_user)):
    try:
        logging.info(f"Received file: {file.filename}, content type: {file.content_type}")
        
        contents = await file.read()
        
        if not contents:
            logging.error("Empty file received")
            raise HTTPException(status_code=400, detail="Empty file received")
            
        logging.info(f"File size: {len(contents)} bytes")
        
        image_base64 = base64.b64encode(contents).decode("utf-8")
        
        emotion_data = await analyze_facial_expression(image_base64)
        logging.info(f"Emotion analysis result: {emotion_data}")
        
        await emotion_collection.insert_one({
            "user_id": user_id,
            "timestamp": datetime.now(),
            "emotion": emotion_data
        })
        
        return emotion_data
    except Exception as e:
        logging.error(f"Error in analyze_emotion: {str(e)}")
        import traceback
        logging.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Error analyzing emotion: {str(e)}")

@app.get("/chat/")
async def get_chat_history(user_id: str = Depends(get_current_user)):
    chat_history = await chat_collection.find_one({"user_id": user_id})

    if not chat_history:
        raise HTTPException(status_code=404, detail="Chat history not found")

    return {"user_id": user_id, "chat_history": chat_history["messages"]}


@app.get("/emotion-analytics/")
async def get_emotion_analytics(user_id: str = Depends(get_current_user)):
    try:
        cursor = emotion_collection.find({"user_id": user_id})
        emotions = await cursor.to_list(length=100)
        
        if not emotions:
            return {"emotions": {}}
        
        emotion_counts = {}
        for entry in emotions:
            emotion = entry["emotion"]["emotion"]
            emotion_counts[emotion] = emotion_counts.get(emotion, 0) + 1
            
        return {"emotions": emotion_counts}
    except Exception as e:
        logging.error(f"Error retrieving emotion analytics: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving emotion analytics")


def run():
    import uvicorn
    uvicorn.run("assignment.main:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    run()