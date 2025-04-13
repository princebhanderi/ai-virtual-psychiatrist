import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./AuthForm.module.css";

export default function AuthForm({ onLoginSuccess = () => {} }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Logout function - clears cookies via backend


  const handleIsLogin = () => {
    setIsLogin(!isLogin);
    setUsername("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!username.trim()) {
      setError("Username is required");
      setIsSubmitting(false);
      return;
    }
    if (!password.trim()) {
      setError("Password is required");
      setIsSubmitting(false);
      return;
    }

    try {
      const endpoint = isLogin ? "/login/" : "/register/";
      const payload = {
        username: username.trim(),
        password: password.trim()
      };

      const response = await axios.post(
        `http://localhost:8000${endpoint}`,
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (typeof onLoginSuccess === "function") {
        onLoginSuccess(response.data);
      }
      navigate("/home");
    } catch (error) {
      console.error("API Error:", error);
      
      if (error.response) {
        const serverError = error.response.data;
        if (serverError.detail) {
          setError(serverError.detail);
        } else if (serverError.non_field_errors) {
          setError(serverError.non_field_errors.join(", "));
        } else if (serverError.username) {
          setError(serverError.username.join(", "));
        } else if (serverError.password) {
          setError(serverError.password.join(", "));
        } else {
          setError(`Request failed with status ${error.response.status}`);
        }
      } else if (error.request) {
        setError("No response from server. Please try again.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`h-[100vh] ${styles.dotbg} flex justify-center items-center`}>
      <div
        className={`${styles.container} rounded-xl ${
          isLogin ? "" : styles.rightpanelactive
        }`}
        id="container"
      >
        {/* Register Form */}
        <div className={`${styles.formcontainer} ${styles.registercontainer}`}>
          <form
            className="flex items-center justify-center gap-5 flex-col h-[100%] text-center px-5 bg-slate-800 text-gray-300"
            onSubmit={handleSubmit}
          >
            <h2 className="bg-gradient-to-br from-[#fce7d6] to-blue-500 bg-clip-text text-transparent font-bold text-3xl transition duration-300 ease-in-out hover:-translate-y-1.5">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>

            {error && (
              <div className="text-red-400 text-sm w-full text-left pl-1">
                {error}
              </div>
            )}

            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 px-5 h-10 rounded-lg focus:outline-0 border-2 border-transparent hover:border-blue-500/40 focus:border-blue-500 text-gray-200"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 px-5 h-10 rounded-lg focus:outline-0 border-2 border-transparent hover:border-blue-500/40 focus:border-blue-500 text-gray-200"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-gradient-to-br from-blue-500 to-blue-800 w-full h-10 rounded-lg 
                text-lg text-white px-6 ${styles.shinybutton} ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Processing..." : (isLogin ? "Login" : "Register")}
            </button>
            <div className="px-10 flex items-center gap-2 w-full">
              <hr className="flex-grow text-white/30" />
              <p>Or</p>
              <hr className="flex-grow text-white/30" />
            </div>
            <p className="text-gray-400 transition-all duration-300 ease-in-out hover:tracking-[1px]">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              type="button"
              onClick={handleIsLogin}
              disabled={isSubmitting}
              className="hover:scale-95 bg-gradient-to-br from-blue-500/15 to-blue-800/15 border border-blue-500/15 text-blue-500 hover:text-blue-400 hover:bg-blue-500/15 w-full rounded-lg h-8 disabled:opacity-50"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </form>
        </div>

        {/* Login Form - kept for animation purposes */}
        <div className={`${styles.formcontainer} ${styles.logincontainer}`}>
          <form
            className="flex items-center justify-center gap-5 flex-col h-[100%] text-center px-5 bg-slate-800 text-gray-300"
            onSubmit={handleSubmit}
          >
            <h2 className="bg-gradient-to-br from-[#fce7d6] to-blue-500 bg-clip-text text-transparent font-bold text-3xl transition duration-300 ease-in-out hover:-translate-y-1.5">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>

            {error && (
              <div className="text-red-400 text-sm w-full text-left pl-1">
                {error}
              </div>
            )}

            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 px-5 h-10 rounded-lg focus:outline-0 border-2 border-transparent hover:border-blue-500/40 focus:border-blue-500 text-gray-200"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 px-5 h-10 rounded-lg focus:outline-0 border-2 border-transparent hover:border-blue-500/40 focus:border-blue-500 text-gray-200"
            />
            <div className="flex flex-col w-full">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-gradient-to-br from-blue-500 to-blue-800 h-10 rounded-lg 
                text-lg text-white px-6 ${styles.shinybutton} ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Processing..." : "Login"}
              </button>
              <a
                href="#"
                className="text-left ml-1 text-gray-400 
                transition-all duration-300 ease-in-out hover:tracking-[1px]"
              >
                Forgot your password?
              </a>
            </div>
            <div className="px-10 flex items-center gap-2 w-full">
              <hr className="flex-grow text-white/30" />
              <p>Or</p>
              <hr className="flex-grow text-white/30" />
            </div>
            <p className="text-gray-400 transition-all duration-300 ease-in-out hover:tracking-[1px]">
              Don't have an account?
            </p>
            <button
              type="button"
              onClick={handleIsLogin}
              disabled={isSubmitting}
              className="hover:scale-95 bg-gradient-to-br from-blue-500/15 to-blue-800/15 border border-blue-500/15 text-blue-500 hover:text-blue-400 hover:bg-blue-500/15 w-full rounded-lg h-8 disabled:opacity-50"
            >
              Register
            </button>
          </form>
        </div>

        {/* Overlay remains unchanged */}
        <div className={styles.overlaycontainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlaypanel} ${isLogin ? "" : styles.zoomanimation} left-0`}>
              <img src="./images/login.jpg" alt="Login" className="w-full" />
            </div>
            <div className={`${styles.overlaypanel} ${isLogin ? styles.zoomanimation : ""} right-0`}>
              <img src="./images/register.jpg" alt="Register" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}