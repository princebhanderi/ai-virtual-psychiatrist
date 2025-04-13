# AI Virtual Psychiatrist

An intelligent mental health assistant that combines facial emotion recognition and collaborative AI to provide personalized mental health support.

## Overview

This application serves as a virtual psychiatric assistant that can detect emotions through facial expressions and provide tailored responses using a collaborative AI approach. It utilizes a FastAPI backend, React frontend, and MongoDB for data storage.

## Features

- **User Authentication**: Secure registration and login system
- **Emotion Detection**: Real-time facial analysis to detect emotions
- **Multi-Agent AI Response**: Collaborative responses from specialized AI agents:
  - Psychiatrist agent for clinical perspective
  - Counselor agent for practical strategies
  - Wellness coach for holistic advice
- **Conversation Memory**: Maintains context across interactions
- **Emotion Analytics**: Tracks emotional patterns over time

## Tech Stack

- **Backend**: FastAPI (Python)
- **Frontend**: React
- **Database**: MongoDB
- **AI Framework**: CrewAI for agent collaboration
- **Computer Vision**: OpenCV for facial detection and analysis

## Installation

### Prerequisites

- Python 3.8+
- Node.js 14+
- MongoDB
- OpenCV

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-virtual-psychiatrist.git
   cd ai-virtual-psychiatrist
   ```

2. Set up the backend:
   ```bash
   # Install dependencies
   uv pip install -r requirements.txt
   
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```
   MONGO_URI=mongodb://localhost:27017
   DB_NAME=virtual_psychiatrist
   ```

4. Set up the frontend:
   ```bash
   cd frontend
   npm install
   ```

## Running the Application

1. Start the MongoDB server:
   ```bash
   mongod
   ```

2. Start the backend server:
   ```bash
   crewai run
   ```

3. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

4. Access the application at `http://localhost:5173`

## Project Structure

```
├── assignment/
│   ├── main.py           # FastAPI application
│   ├── crew.py           # CrewAI agent configuration
│   └── config/           # Agent and task configuration
│       ├── agents.yaml   # Agent definitions
│       └── tasks.yaml    # Task definitions
├── frontend/             # React application
├── requirements.txt      # Python dependencies
└── .env                  # Environment variables
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/register/` | POST | Register new user |
| `/login/` | POST | User login |
| `/logout/` | POST | User logout |
| `/user/` | GET | Get current user details |
| `/chat/` | POST | Send message to chatbot |
| `/chat/` | GET | Get chat history |
| `/analyze-emotion/` | POST | Upload image for emotion analysis |
| `/emotion-analytics/` | GET | Get emotion statistics |

## How It Works

1. **Facial Emotion Detection**:
   - The application captures the user's facial expression via webcam
   - OpenCV processes the image to detect faces
   - A custom algorithm analyzes facial features to determine emotions
   - Detected emotions are stored in MongoDB and used to contextualize responses

2. **Multi-Agent AI Response**:
   - The user's message is analyzed by three specialized AI agents
   - Each agent provides its perspective based on its specialty
   - The perspectives are combined into a cohesive, tailored response
   - The response is adjusted based on the detected emotion

3. **Emotion Analytics**:
   - The system tracks emotional patterns over time
   - Users can view their emotional trends

## Configuration

### Agent Configuration

Agents are configured in `config/agents.yaml`. Each agent has specific knowledge and capabilities:

- **Psychiatrist**: Provides clinical perspectives and diagnostic insights
- **Counselor**: Offers practical coping strategies and solutions
- **Wellness Coach**: Recommends holistic approaches for overall wellbeing

### Task Configuration

Tasks are defined in `config/tasks.yaml`. The main task is `assess_and_respond`, which coordinates the collaborative response process.

## Security Considerations

- User passwords are stored securely
- Session cookies are HTTP-only, secure, and SameSite
- CORS is configured to restrict access to trusted origins

## Future Enhancements

- Integration with wearable devices for physiological data
- Voice tone analysis for additional emotional context
- Expanded agent capabilities for specialized mental health areas
- Mobile application support

## License

[MIT License](LICENSE)



## Acknowledgments

- CrewAI for the multi-agent framework
- OpenCV for computer vision capabilities
