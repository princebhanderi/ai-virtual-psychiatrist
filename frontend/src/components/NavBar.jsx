import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const NavBar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme !== "dark" && storedTheme !== "light") {
      return "dark";
    }
    return storedTheme;
  });

  const handleLogout = async () => {
    console.log("🔵 Logout initiated...");
  
    try {
      const response = await axios.post(
        "http://localhost:8000/logout/",
        {},
        {
          withCredentials: true, // Ensure cookies are included
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("✅ Logout API Response:", response.data);
  
      // 🔥 Clear chat data (if stored in local/session storage)
      console.log("🗑️ Clearing chat history...");
      localStorage.removeItem("chatHistory");
      sessionStorage.removeItem("chatHistory");
  
      // 🔥 Clear all cookies (IMPORTANT)
      console.log("🍪 Clearing cookies...");
      document.cookie.split(";").forEach((cookie) => {
        console.log("Deleting cookie:", cookie);
        document.cookie = cookie
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
      });
  
      // 🔄 Update state and force UI refresh
      console.log("🛑 Setting isAuthenticated to false...");
      // setIsAuthenticated(false);
  
      // 🔄 Redirect to /auth (force refresh)
      console.log("🔄 Redirecting to /auth...");
      window.location.href = "/auth";
  
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };
  

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // const handleLogout = async () => {
  //   try {
  //     await axios.post("http://localhost:8000/logout/", {}, {
  //       withCredentials: true,
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     });
      
  //     setIsAuthenticated(false);
  //     setIsOpen(false);
  //     navigate("/auth");
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //     setIsAuthenticated(false);
  //     setIsOpen(false);
  //     navigate("/auth");
  //   }
  // };

  return (
    <>
      <nav
        className="h-[8vh] md:h-[10vh] flex flex-row justify-between items-center px-5
          bg-blue-50 text-gray-700
          dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 dark:text-gray-300 gap-6"
      >
        <div className="flex items-center gap-5">
          

          <NavLink
            to="/"
            className="bg-clip-text text-transparent font-bold text-xl
            bg-gradient-to-r from-blue-400 to-blue-900
            dark:bg-gradient-to-r dark:from-gray-200 dark:to-blue-500 
            transition-all duration-300 ease-in-out hover:tracking-[1px] tracking-[0.5px] hover:scale-110"
          >
            ChatBot
          </NavLink>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={() =>
              setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
            }
            className="cursor-pointer flex items-center bg-blue-500/40 dark:bg-blue-500/20 rounded-full p-0.5 transition-all duration-300 ease-in-out"
          >
            <svg
              width={`${theme === "light" ? 22 : 15}`}
              height={`${theme === "light" ? 22 : 15}`}
              className={`p-0.5 rounded-full transition-all duration-300 ease-in-out transform ${
                theme === "light"
                  ? "bg-gradient-to-br from-blue-500 to-blue-900 text-white scale-100 opacity-100"
                  : "text-white/40 scale-60 opacity-0"
              }`}
            >
              <use xlinkHref="/icons.svg#sun-icon"></use>
            </svg>
            <svg
              width={`${theme === "dark" ? 22 : 15}`}
              height={`${theme === "dark" ? 22 : 15}`}
              className={`p-0.5 rounded-full transition-all duration-300 ease-in-out transform ${
                theme === "dark"
                  ? "bg-gradient-to-br from-blue-500/80 to-blue-900 text-white scale-100 opacity-100"
                  : "text-white/90 scale-60 opacity-0"
              }`}
            >
              <use xlinkHref="/icons.svg#moon-icon"></use>
            </svg>
          </button>

          {isAuthenticated ? (
            <>
              <div
                className="relative flex items-center"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-800 text-white rounded-full flex justify-center items-center hover:scale-110 cursor-pointer">
                  U
                </div>

                {isOpen && (
                  <div className="backdrop-blur-[1px] absolute top-8 left-0 w-32 bg-white/10 shadow-lg rounded-md overflow-hidden border border-white/10">
                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full px-4 py-2 text-left hover:bg-blue-500/15"
                    >
                      Profile
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="text-red-500 w-full px-4 py-2 text-left hover:bg-blue-500/15"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-red-500 bg-gradient-to-br from-red-400/20 to-red-800/20 border border-red-500/10 rounded-md flex justify-center items-center hover:bg-red-500/15"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              onClick={handleLogout}
              className="px-3 py-1 text-blue-500 bg-gradient-to-br from-blue-400/20 to-blue-800/20 border border-blue-500/10 rounded-md flex justify-center items-center hover:bg-blue-500/15"
            >
              Logout
            </NavLink>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
