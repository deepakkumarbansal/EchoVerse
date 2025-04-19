import React from 'react';
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
  const navigate = useNavigate();
    return (
      <div className='bg-gray-100'>
        <h1 className='text-2xl font-serif absolute top-3 left-2 tracking-widest'>EchoVerse</h1>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to EchoVerse
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Audio Diaries for the Future You.
            </p>
            <button onClick={()=>navigate('/home')} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
};

export default GetStarted;
