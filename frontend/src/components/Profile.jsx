import React from "react";
import NavBar from "./NavBar";

const Profile = () => {
  return (
    <div>
      <NavBar />
      <div
        className="md:min-h-[90vh] 
      bg-gradient-to-br from-blue-100 to-purple-200 text-gray-700
      dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-950 dark:text-gray-300 
      pb-10"
      >
        <div
          className="bg-gradient-to-r from-yellow-600 via-pink-600 to-blue-600
            dark:bg-gradient-to-r dark:from-yellow-500 dark:via-pink-500 dark:to-blue-500 
            bg-clip-text text-transparent
            font-semibold text-2xl transition-all duration-300 ease-in-out hover:tracking-[0.5px] text-center pt-3 pb-2"
        >
          Your Profile
        </div>
        <div className="w-[90%] mx-auto m-5 flex flex-col gap-5 items-center">
          <img
            className="w-[150px] h-[150px] rounded-full border-4 border-white"
            src="https://example.com/profile_picture.jpg"
            alt="Profile Picture"
          />
          <div className="flex flex-col gap-4">
            <div>Name: John Doe</div>
            <div>Email: john.doe@example.com</div>
            <div>Phone: 123-456-7890</div>
            <div>Address: 123 Main St, Anytown, USA</div>
            <div>
              <button className="w-[100%] text-white bg-blue-500 hover:bg-blue-600 rounded-md py-2 px-4">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
