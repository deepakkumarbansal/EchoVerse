import React, { useState } from 'react';
import RecordAndListnenAudio from '../Components/RecordAndListnenAudio';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEntry = () => {
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 10); // add 1 minute
    now.setDate(now.getDate() + 1); // add 1 day
    console.log(now.toISOString().slice(0, 16), "min");
    
    return now.toISOString().slice(0, 16);
  };
  
  const [title, setTitle] = useState('');
  const [unlockDate, setUnlockDate] = useState('');
  const [mood, setMood] = useState("");
  const [otherMood, setOtherMood] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  const availableMoods = ['Select','😊 Happy','😢 Sad','🤩 Excited','😌 Calm','🎭 Others'];
  

  const handleSubmit = async(e) => {
    if (!title || !unlockDate || !mood || (mood === "🎭 Others" && !otherMood) || !audioBlob) {
      alert("Please fill out all fields including recording or uploading an audio.");
      return;
    }
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title); 
    formData.append('unlocksAt', unlockDate);
    formData.append('mood', mood == "🎭 Others" ? otherMood : mood);
    formData.append('audioBlob', audioBlob);

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/audio/create-audio`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      withCredentials: true,
    });
    console.log(response.data, "res");
    
    if(response.status === 201) {
      alert("Entry created successfully");
      navigate('/home')
    }
    setIsLoading(false);
    setTitle('');
    setUnlockDate('');
    setMood('');
    setOtherMood('');
    setAudioBlob(null);
    setIsRecording(false);
    
  };

  return (
    <div className='flex items-center justify-center min-h-screen w-full'>
      <div className="font-sans p-6 w-full max-w-lg mx-auto bg-gray-100 rounded-lg shadow-md ">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Create Entry
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Title:
            </label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Unlock Date:
            </label>
            <input
              required
              type="datetime-local"
              min={getMinDateTime()}
              value={unlockDate}
              onChange={(e) => setUnlockDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Mood:
            </label>
            <div className="flex gap-2 ">
              <select
                required
                className="flex flex-wrap gap-3"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
              >
                {availableMoods.map((m, index) => (
                  <option
                    disabled={m == "Select"}
                    key={index}
                    value={m == "Select" ? "" : m}
                    className="px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {m}
                  </option>
                ))}
              </select>
              {mood == "🎭 Others" && (
                <input
                  required
                  type="text"
                  placeholder="Enter your mood"
                  value={otherMood}
                  onChange={(e) => {
                    setOtherMood(e.target.value);
                  }}
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}
            </div>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Audio:
            </label>
            <RecordAndListnenAudio audioBlob={audioBlob} setAudioBlob={setAudioBlob}/>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            onClick={handleSubmit}
            className="px-6 mt-2 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 self-center"
          >
            { isLoading ? 'Creating secret...': 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEntry;
