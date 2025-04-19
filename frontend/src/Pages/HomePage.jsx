import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Home Page</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Link to="/create-secret">
                        <div className="bg-purple-100 p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold text-purple-800 mb-2">Create Entry</h2>
                            <p className="text-gray-700">Create an entry that will unlock for your future self. It can be a confession, dream, personal goal, emotional check-in, or piece of advice.</p>
                        </div>
                    </Link>

                    <Link to={'/my-timeline'}>
                        <div className="bg-green-100 p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold text-green-800 mb-2">My Timeline</h2>
                            <p className="text-gray-700">Write and manage your personal diary entries.</p>
                        </div>
                    </Link>

                    {/* <Link to={'/unlocked-audios'}>
                        <div className="bg-yellow-100 p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold text-yellow-800 mb-2">Unlocked Audios</h2>
                            <p className="text-gray-700">Access your unlocked audio content.</p>
                        </div>
                    </Link> */}

                    <Link to={'/profile'}>
                        <div className="bg-blue-100 p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold text-blue-800 mb-2">Profile</h2>
                            <p className="text-gray-700">View and edit your profile details.</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;