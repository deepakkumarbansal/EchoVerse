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
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                  },
            })
            if (response.status === 200) {
                const data = response.data.data;
                setUser({
                    name: data.fullName,
                    email: data.email,
                });
            }
        })();
    }, [])
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <div className="flex flex-col items-center">
                    {/* <img
                        className="w-24 h-24 rounded-full border-2 border-blue-500"
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                    /> */}
                    <h2 className="mt-4 text-xl font-semibold text-gray-800">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                </div>
                <div className="mt-6">
                    <button onClick={async()=>{
                        localStorage.removeItem("token");
                        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/logout`, {}, {
                            withCredentials: true,
                        })
                        navigate("/login");
                    }} className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;