import React, { useEffect, useState } from 'react';
import { IoIosPlayCircle } from 'react-icons/io';
import { MdOutlinePauseCircleFilled } from 'react-icons/md';

const RecordAndListnenAudio = ({ audioBlob, setFormData, formData }) => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  let audioChunks = [];
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const playableAudio = new Audio(url);
      setAudioFile(playableAudio);
    }
  }, [audioBlob]);

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    setMediaRecorder(mediaRecorder);

    mediaRecorder.ondataavailable = function (e) {
      audioChunks.push(e.data);
    };

    mediaRecorder.onstop = function () {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      setFormData({ ...formData, audioBlob });
      stream.getTracks().forEach((track) => track.stop());
      audioChunks = [];
    };

    mediaRecorder.start();
  }

  function stopRecording() {
    if (mediaRecorder) mediaRecorder.stop();
  }

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg border shadow-sm">
      <div className="text-center">
        {isRecording ? (
          <button
            type="button"
            onClick={() => {
              stopRecording();
              setIsRecording(false);
            }}
            className="w-full px-4 py-2 text-white bg-red-500 rounded-md shadow hover:bg-red-600 transition-all"
          >
            🟥 Stop Recording
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              startRecording();
              setIsRecording(true);
            }}
            className="w-full px-4 py-2 text-white bg-green-500 rounded-md shadow hover:bg-green-600 transition-all"
          >
            🎙️ Start Recording
          </button>
        )}
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 mb-1">Or upload an audio file</p>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setFormData({ ...formData, audioBlob: file });
          }}
          className="block p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {audioBlob && (
        <div className="flex items-center justify-center gap-2 mt-2">
          {!isPlaying ? (
            <button
              type="button"
              onClick={() => {
                setIsPlaying(true);
                audioFile.play();
                audioFile.onended = () => setIsPlaying(false);
              }}
              className="text-blue-600 text-4xl hover:scale-105 transition-all"
              title="Play Audio"
            >
              <IoIosPlayCircle />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                audioFile.pause();
              }}
              className="text-blue-600 text-4xl hover:scale-105 transition-all"
              title="Pause Audio"
            >
              <MdOutlinePauseCircleFilled />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RecordAndListnenAudio;
