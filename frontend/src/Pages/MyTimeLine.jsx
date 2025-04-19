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
        const response = await axios.get("http://localhost:8000/api/audio/get-all-audio", {
          withCredentials: true,
        });
    
        if (response.status === 200) {
          const data = response.data.data;
    
          const updatedData = await Promise.all(
            data.map(async (audioFile) => {
              const isUnlocked = new Date(audioFile.unlocksAt).getTime() <= Date.now();
    
              if (isUnlocked) {
                try {
                  const fileResponse = await axios.get(
                    `http://localhost:8000/api/audio/get-audio/${audioFile._id}`,
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
    };
    

    fetchTimelineData();
    setLoading(false);
  }, []);

  return (
    loading ? (
      <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    ) : (
      <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Timeline</h1>
      <div className="space-y-8">
        {
          Object.keys(timeLineData).length > 0 ? (
            <>
            {reverseSortedDates.map((date) => {
            const audioFiles = timeLineData[date];
            return (
              <div key={date} className="border-l-4 border-blue-500 pl-4">
              <h2 className="text-xl font-semibold">{`Group: ${date}`}</h2>
              <ul className="space-y-4 pl-6">
                {audioFiles.map((audioFile) => {
                const isUnlocked = new Date(audioFile.unlocksAt).getTime() <= Date.now();
                
                return (
                  <li key={audioFile._id} className="text-gray-700">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-bold">{audioFile.title}</h3>
                        <p className="text-sm text-gray-500">{`Mood: ${audioFile.mood}`}</p>
                        {!isUnlocked && (
                          <p className="text-sm text-red-500">{`Unlocks At: ${new Date(
                            audioFile.unlocksAt
                          ).toLocaleString()}`}</p>
                        )}
                      </div>
                      {isUnlocked ? (
                        <>
                        <audio src={audioFile.file} controls ></audio>
                      </>
                      ) : (
                        <button
                          disabled
                          className="px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed"
                        >
                          Locked
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
            </>
          ): (<h1>No Timeline found</h1>)
        }
      </div>
    </div>
    )
  );
};

export default MyTimeLine;

createdAt
: 
"2025-04-19T19:41:22.233Z"
file
: 
"76d37f760098d9bed1cdeafa4c19a1e985098002667d8c474ce7caef1603524fE1hcMTunDr0alt4mm0JSa0+VjzizogXMlGbR6vNVii+bW6uN64pmXlmKBiZkOg+C0ErV/smVLbaZ60W2spPuIKFeSs/ZvjTBto+++WbaQhdUKH28DcN5RdcMISF2V+RD34c155135d9cda18a16f294f5dc7c12329b06b606af182bfba5a17a7fbac53fe"
mood
: 
"Happy"
title
: 
"Confession"
unlocksAt
: 
"2025-04-20T18:30:00.000Z"
updatedAt
: 
"2025-04-19T19:41:22.233Z"
userId
: 
"6803df233bfdf05f82752e88"
__v
: 
0
_id
: 
"6803fc62b66db98c11e57845"