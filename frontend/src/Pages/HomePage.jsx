import React from "react";
import { Link } from "react-router-dom";
import { FaFeatherAlt, FaUserCircle, FaClock } from "react-icons/fa";

const HomePage = () => {
    const cards = [
        {
            to: "/create-secret",
            icon: <FaFeatherAlt className="text-purple-600 text-3xl" />,
            title: "Create Entry",
            description:
                "Write something meaningful for your future self. It could be a dream, goal, or a heartfelt note.",
            bg: "from-purple-200 to-purple-100",
        },
        {
            to: "/my-timeline",
            icon: <FaClock className="text-green-600 text-3xl" />,
            title: "My Timeline",
            description:
                "Explore and manage all your personal diary entries beautifully sorted by time.",
            bg: "from-green-200 to-green-100",
        },
        {
            to: "/profile",
            icon: <FaUserCircle className="text-blue-600 text-3xl" />,
            title: "Profile",
            description:
                "View and customize your personal profile to reflect your identity.",
            bg: "from-blue-200 to-blue-100",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-tr from-indigo-200 via-pink-100 to-blue-100 flex items-center justify-center px-6 py-16">
            <div className="w-full max-w-6xl bg-white bg-opacity-60 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/30">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12 tracking-tight">
                    Welcome Back 👋
                </h1>
                <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
                    {cards.map((card, idx) => (
                        <Link
                            to={card.to}
                            key={idx}
                            className={`bg-gradient-to-br ${card.bg} p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300`}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-white p-3 rounded-full shadow">
                                    {card.icon}
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {card.title}
                                </h2>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {card.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
