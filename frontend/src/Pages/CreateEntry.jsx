import React, { useState } from "react";
import RecordAndListnenAudio from "../Components/RecordAndListnenAudio";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateEntry = () => {
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1);
    return now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
  };
  const [error, setError] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    unlockDate: "",
    mood: "",
    audioBlob: null,
    otherMood: "",
  });
  const availableMoods = [
    "Select",
    "😊 Happy",
    "😢 Sad",
    "🤩 Excited",
    "😌 Calm",
    "🎭 Others",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "formdata");
    
    setError("");
    setIsLoading(true)
    if ( !formData.title || !formData.unlockDate || !formData.mood || (formData.mood === "🎭 Others" && !formData.otherMood) || !formData.audioBlob) {
      setError( "Please fill out all fields.");
      setIsLoading(false)
      return;
    }
    if(new Date(formData.unlockDate) <= new Date()){
      setError("Unlock date should be in the future");
      setIsLoading(false)
      return;
    }
    console.log("cond", new Date(formData.unlockDate) <= new Date());
    console.log("unlock Date", formData.unlockDate);
    console.log("new Date", new Date(formData.unlockDate));
    console.log("current Date", new Date());
    

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("unlocksAt", formData.unlockDate);
      data.append("mood", formData.mood === "🎭 Others" ? formData.otherMood : formData.mood);
      data.append("audioBlob", formData.audioBlob);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/audio/create-audio`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        alert("Entry created successfully");
        navigate("/home");
      }
    } catch (error) {
      if(error.response?.status === 401) {
        setError(`Unauthorized: ${error.response.data.message}`);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
      else if (error.response?.status === 405) {
        setError(`Bad Request: ${error.response.data.message || "Unlock date should be in the future"}`);
      } else if (error.response?.status === 406) {
        setError("Audio file is required");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setFormData({
        title: "",
        unlockDate: "",
        mood: "",
        audioBlob: null,
        otherMood: "",
      })
      setIsLoading(false);
      setIsRecording(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-pink-100 to-blue-100 px-4 py-8">
      <div className="w-full max-w-2xl bg-white/60 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/30">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🎙️ Create a Secret Entry
        </h1>
        {error && (
          <p className="text-center mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
           {error}
          </p>)}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Title
            </label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g. My Secret Diary"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Unlock Date */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Unlock Date
            </label>
            <input
              required
              type="datetime-local"
              min={getMinDateTime()}
              value={formData.unlockDate}
              onChange={(e) => setFormData({...formData, unlockDate: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Mood Selection */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Mood
            </label>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <select
                required
                value={formData.mood}
                onChange={(e) => setFormData({...formData, mood: e.target.value})}
                className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {availableMoods.map((m, i) => (
                  <option
                    key={i}
                    disabled={m === "Select"}
                    value={m === "Select" ? "" : m}
                  >
                    {m}
                  </option>
                ))}
              </select>

              {formData.mood === "🎭 Others" && (
                <input
                  required
                  type="text"
                  placeholder="e.g. Guilty"
                  value={formData.otherMood}
                  onChange={(e) => setFormData({...formData, otherMood: e.target.value})}
                  className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              )}
            </div>
          </div>

          {/* Audio Recorder */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Audio
            </label>
            <RecordAndListnenAudio
              audioBlob={formData.audioBlob}
              setFormData={setFormData}
              formData={formData}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? "Creating secret..." : "✨ Submit Entry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEntry;
