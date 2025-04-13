import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AuthForm from "./components/AuthForm";
import NotFound from "./components/NotFound";
import History from "./components/History";
import Profile from "./components/Profile";
import Bot from "./components/Bot";
import EmotionAnalytics from "./components/EmotionalAnalytics";
import EmotionDetector from "./components/EmotionDetector";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bot" element={<Bot />} />
        <Route path="/emotionanalytics" element={<EmotionAnalytics />} />
        <Route path="/EmotionDetector" element={<EmotionDetector/>} />
        <Route path="/home" element={<Home />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
