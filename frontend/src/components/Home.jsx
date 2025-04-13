import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Brain, MessageCircle, Shield } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const handleChatbotClick = () => {
    navigate("/bot");
  };

  const features = [
    {
      icon: <Brain className="w-10 h-10 text-indigo-500" />,
      title: "AI-Powered Support",
      description: "Intelligent conversations that adapt to your unique mental health needs"
    },
    {
      icon: <Shield className="w-10 h-10 text-indigo-500" />,
      title: "Private & Secure",
      description: "Your conversations remain confidential with advanced security measures"
    },
    {
      icon: <MessageCircle className="w-10 h-10 text-indigo-500" />,
      title: "24/7 Availability",
      description: "Get support anytime, anywhere, without scheduling appointments"
    },
    {
      icon: <Heart className="w-10 h-10 text-indigo-500" />,
      title: "Compassionate Care",
      description: "Experience empathetic responses designed to support your wellbeing"
    }
  ];

  const testimonials = [
    {
      quote: "This virtual psychiatrist helped me understand my anxiety patterns in ways I never expected.",
      author: "Alex M."
    },
    {
      quote: "I appreciate having someone to talk to whenever I need it, without judgment.",
      author: "Jamie T."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
              Your <span className="text-indigo-600 dark:text-indigo-400">Mental Health</span> Companion
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
              Experience supportive conversations with our AI-powered virtual psychiatrist. Share your thoughts, explore coping strategies, and find clarity—anytime, anywhere.
            </p>
            <button
              onClick={handleChatbotClick}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-10 py-4 rounded-full shadow-lg transition-all transform hover:scale-105 hover:shadow-xl"
            >
              Start Talking Now
            </button>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-20 blur-3xl transform -translate-x-4 translate-y-4"></div>
              <img
                src="./images/doctor/doctor_cartoon.png"
                alt="AI Virtual Psychiatrist"
                className="relative rounded-2xl shadow-2xl max-w-md w-full object-cover z-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">How We Support Your Mental Health</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md text-center w-full md:w-1/3">
              <div className="bg-indigo-100 dark:bg-indigo-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 dark:text-indigo-300 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Start a Conversation</h3>
              <p className="text-gray-600 dark:text-gray-300">Click the button to begin chatting with our AI virtual psychiatrist</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md text-center w-full md:w-1/3">
              <div className="bg-indigo-100 dark:bg-indigo-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 dark:text-indigo-300 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Share Your Thoughts</h3>
              <p className="text-gray-600 dark:text-gray-300">Express your feelings and concerns in a safe, judgment-free space</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md text-center w-full md:w-1/3">
              <div className="bg-indigo-100 dark:bg-indigo-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 dark:text-indigo-300 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Receive Guidance</h3>
              <p className="text-gray-600 dark:text-gray-300">Get personalized insights and coping strategies to support your wellbeing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-indigo-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">User Experiences</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-md">
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{item.quote}"</p>
                <p className="text-gray-800 dark:text-gray-200 font-medium">— {item.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Ready to Start Your Mental Health Journey?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Our AI Virtual Psychiatrist is here to listen, support, and guide you through your mental health challenges.
          </p>
          <button
            onClick={handleChatbotClick}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-10 py-4 rounded-full shadow-lg transition-all transform hover:scale-105 hover:shadow-xl"
          >
            Chat with Chatbot
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">AI Virtual Psychiatrist</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
              A supportive space for your mental wellbeing through the power of artificial intelligence.
            </p>
            <div className="flex justify-center space-x-4 mb-8">
              <a href="#" className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400">
                <span className="sr-only">Privacy Policy</span>
                <span>Privacy Policy</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400">
                <span className="sr-only">Terms of Service</span>
                <span>Terms of Service</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400">
                <span className="sr-only">Contact</span>
                <span>Contact</span>
              </a>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} AI Virtual Psychiatrist. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;