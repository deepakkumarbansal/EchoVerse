import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/profile`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        const data = response.data.data;
        setUser({
          name: data.fullName,
          email: data.email,
        });
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
            <img
              className="w-full h-full object-cover"
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500 mt-2">{user.email}</p>
        </div>

        <div className="mt-6">
          <button
            onClick={async () => {
              localStorage.removeItem("token");
              await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/user/logout`,
                {},
                {
                  withCredentials: true,
                }
              );
              navigate("/login");
            }}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;