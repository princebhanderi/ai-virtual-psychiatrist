from fastapi import FastAPI, HTTPException
from src.assignment.crew import Assignment

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the CrewAI FastAPI backend!"}

@app.post("/run-crew/")
def run_crew(topic: str):
    """
    API endpoint to trigger CrewAI agents for a given topic.
    """
    try:
        inputs = {"topic": topic}
        result = Assignment().crew().kickoff(inputs=inputs)
        return {"status": "success", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))