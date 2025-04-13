import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChatBox from "./ChatBox";
import AuthForm from "./AuthForm";

export default function ChatBot() {
  const [userId, setUserId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const navigate = useNavigate();

  const handleLoginSuccess = (id) => {
    setUserId(id);
    fetchChatHistory(id);
    navigate("/chat");
  };

  const fetchChatHistory = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8000/chat/${id}`);
      setChatHistory(res.data.chat_history);
    } catch (error) {
      setChatHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col items-center justify-center p-4">
      {!userId ? (
        <AuthForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <ChatBox
          userId={userId}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
        />
      )}
    </div>
  );
}
