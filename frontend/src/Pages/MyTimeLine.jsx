import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const MyTimeLine = () => {
  const [timeLineData, setTimeLineData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [reverseSortedDates, setReverseSortedDates] = useState([]);

  useEffect(() => {
    setLoading(true);
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
                    { withCredentials: true }
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

            if (!acc[key]) {
              acc[key] = [];
            }
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
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  ) : (
    <div className="p-6 max-w-4xl mx-auto bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">🎧 My Audio Timeline</h1>
      {Object.keys(timeLineData).length > 0 ? (
        <div className="space-y-10">
          {reverseSortedDates.map((date) => {
            const audioFiles = timeLineData[date];
            return (
              <div key={date} className="border-l-4 border-blue-500 pl-6">
                <h2 className="text-xl font-semibold text-blue-600 mb-4">{`📅 ${date}`}</h2>
                <ul className="space-y-6">
                  {audioFiles.map((audioFile) => {
                    const isUnlocked = new Date(audioFile.unlocksAt).getTime() <= Date.now();
                    return (
                      <li
                        key={audioFile._id}
                        className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{audioFile.title}</h3>
                            <p className="text-sm text-gray-500">{`Mood: ${audioFile.mood}`}</p>
                            {!isUnlocked && (
                              <p className="text-sm text-red-500">{`Unlocks At: ${new Date(audioFile.unlocksAt).toLocaleString()}`}</p>
                            )}
                          </div>
                          {isUnlocked ? (
                            <audio src={audioFile.file} controls className="w-full md:w-80 mt-2 md:mt-0" />
                          ) : (
                            <button
                              disabled
                              className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg font-medium shadow-sm cursor-not-allowed"
                            >
                              🔒 Locked
                            </button>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-lg text-gray-600 mt-10">No Timeline Found</div>
      )}
    </div>
  );
};

export default MyTimeLine;
