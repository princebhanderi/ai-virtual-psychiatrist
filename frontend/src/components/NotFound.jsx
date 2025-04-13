import React from "react";
import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-[100vh]">
      <NavBar />
      <div
        className="h-[90%] flex flex-col justify-center items-center
      dark:bg-gradient-to-tr dark:from-gray-950 dark:to-gray-800
      bg-gradient-to-tr from-blue-200 to-purple-200
      "
      >
        <h2
          className="text-red-500 h-20 font-bold text-6xl 
        transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:scale-115"
        >
          oops!
        </h2>
        <div
          className="text-7xl m-3 p-5 rounded-full aspect-square flex justify-center items-center bg-blue-500/20 dark:bg-white/5
        transition-all duration-300 ease-in-out hover:scale-110"
        >
          🔎
        </div>
        <p
          className="text-gray-700 font-semibold dark:font-normal dark:text-gray-300 text-lg tracking-[3px] 
        transition-all duration-500 ease-in-out hover:tracking-[4px] "
        >
          <span className="text-yellow-500 ">404</span> nothing found here
        </p>
        <NavLink
          to="/"
          className="w-60 m-2 max-w-[98vw] text-center rounded-lg p-1 border
          text-blue-700 font-semibold dark:font-normal dark:text-blue-500 
          bg-gradient-to-br from-blue-500/20 to-blue-500/60 border-blue-500/15 hover:bg-blue-500/15 
          dark:bg-gradient-to-br dark:from-blue-500/20 dark:to-blue-800/20 dark:border-blue-500/15 dark:hover:bg-blue-500/10 
          transition-transform duration-100 ease-in hover:scale-95"
        >
          Return home
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
