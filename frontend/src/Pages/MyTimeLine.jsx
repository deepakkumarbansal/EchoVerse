import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";

const MyTimeLine = () => {
  const [timeLineData, setTimeLineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reverseSortedDates, setReverseSortedDates] = useState([]);

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/audio/get-all-audio`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200) {
          const data = response.data.data;

          const updatedData = await Promise.all(
            data.map(async (audioFile) => {
              const isUnlocked = new Date(audioFile.unlocksAt).getTime() <= Date.now();

              if (isUnlocked) {
                try {
                  const fileResponse = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/api/audio/get-audio/${audioFile._id}`,
                    {
                      withCredentials: true,
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                    }
                  );

                  if (fileResponse.status === 200) {
                    audioFile.file = fileResponse.data.data.audio.file;
                  }
                } catch (err) {
                  console.error(`Error fetching file for audio ${audioFile._id}:`, err);
                }
              }

              return audioFile;
            })
          );

          const groupedData = updatedData.reduce((acc, audioFile) => {
            const date = audioFile.createdAt;
            const year = new Date(date).getFullYear();
            const month = String(new Date(date).getMonth() + 1).padStart(2, "0");
            const key = `${year}-${month}`;
            if (!acc[key]) acc[key] = [];
            acc[key].push(audioFile);
            return acc;
          }, {});

          const sortedDates = Object.keys(groupedData).sort().reverse();

          setTimeLineData(groupedData);
          setReverseSortedDates(sortedDates);
        }
      } catch (error) {
        console.error("Error fetching timeline data:", error);
      }
      setLoading(false);
    };

    fetchTimelineData();
  }, []);

  return loading ? (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-800 to-purple-600">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400"></div>
    </div>
  ) : (
    <div className="p-8 max-w-full mx-auto bg-gradient-to-r from-indigo-700 via-blue-600 to-purple-700 min-h-screen text-white">
      <h1 className="text-5xl font-extrabold mb-12 text-center">
        🎧 My Audio Timeline
      </h1>

      {reverseSortedDates.length ? (
        <div className="space-y-12">
          {reverseSortedDates.map((date) => {
            const audioFiles = timeLineData[date];
            return (
              <div key={date} className="bg-white bg-opacity-10 rounded-xl p-6 mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="h-8 w-8 bg-gradient-to-r from-indigo-600 to-blue-400 rounded-full mr-4"></div>
                  <h2 className="text-2xl font-semibold text-gray-200">{`📅 ${date}`}</h2>
                </div>

                <div className="space-y-6 pl-8">
                  {audioFiles.map((audioFile) => {
                    const isUnlocked = new Date(audioFile.unlocksAt).getTime() <= Date.now();

                    return (
                      <div
                        key={audioFile._id}
                        className="bg-gradient-to-r from-purple-800 to-blue-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="flex-1">
                            <h3 className="text-2xl font-semibold text-white">{audioFile.title}</h3>
                            <p className="text-sm text-gray-400">{`Mood: ${audioFile.mood}`}</p>
                            {!isUnlocked && (
                              <p className="text-sm text-red-400 mt-2">
                                Unlocks At:{" "}
                                {new Date(audioFile.unlocksAt).toLocaleString("en-US", {
                                  hour12: true,
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  year: "numeric",
                                  month: "short",
                                  day: "2-digit",
                                })}
                              </p>
                            )}
                          </div>
                          <div className="w-full md:w-auto">
                            {isUnlocked ? (
                              <div className="flex items-center gap-2">
                                <FaLockOpen className="text-green-400 text-xl" />
                                <audio
                                  src={audioFile.file}
                                  controls
                                  className="w-full md:w-80 mt-2 md:mt-0 rounded-lg"
                                />
                              </div>
                            ) : (
                              <button
                                disabled
                                className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-gray-200 rounded-lg cursor-not-allowed transition-all duration-300"
                              >
                                🔒 Locked
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-lg text-gray-500 mt-10">No Timeline Found</div>
      )}
    </div>
  );
};

export default MyTimeLine;
