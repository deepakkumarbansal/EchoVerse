import React, { useEffect, useState } from 'react'
import { IoIosPlayCircle } from "react-icons/io";
import { MdOutlinePauseCircleFilled } from "react-icons/md";


const RecordAndListnenAudio = ({audioBlob, setAudioBlob}) => {
    const [mediaRecorder, setMediaRecorder] = useState(null);
    let audioChunks = [];
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioFile, setAudioFile] = useState(null);
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        if(audioBlob){
            const url = URL.createObjectURL(audioBlob)
            const playableAudio = new Audio(url);
            setAudioFile(playableAudio);
        }
    }, [audioBlob]);

    async function startRecording() {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        const mediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(mediaRecorder);
        mediaRecorder.ondataavailable = function(e){
            audioChunks.push(e.data);
        }
        mediaRecorder.onstop = function(){
            const audioBlob = new Blob(audioChunks, {type: "audio/webm"}) 
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
            setAudioBlob(audioBlob);
            stream.getTracks().forEach(track => track.stop());
            audioChunks = [];
            console.log("Audio URL: ", audioUrl,"blob", audioBlob,"audio", audio, "chunks",audioChunks, "stream", stream);
        }
        mediaRecorder.start();
        console.log("Recording started", mediaRecorder);
    }
    function stopRecording() {
        mediaRecorder.stop()
        console.log("Recording stopped");
    }

return (
  <>
    <div className="text-center">
      {isRecording ? (
        <button
          onClick={() => {
            stopRecording();
            setIsRecording(false);
          }}
          className="bg-red-500 text-white rounded w-full px-5 py-2 text-lg cursor-pointer shadow-md hover:bg-red-600"
        >
          Stop Recording
        </button>
      ) : (
        <button
          onClick={() => {
            startRecording();
            setIsRecording(true);
          }}
          className="bg-green-500 text-white w-full rounded px-5 py-2 text-lg cursor-pointer shadow-md hover:bg-green-600"
        >
          Start Recording
        </button>
      )}
        <p className='mt-2'>Or upload</p>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setAudioBlob(file);
          }}
        />
    </div>
    {audioBlob && (
      <>
        {!isPlaying ? (
          <button className={`text-3xl mt-2`} onClick={() => {setIsPlaying(true); audioFile.play();}}>
            <IoIosPlayCircle />
          </button>
        ) : (
          <button className={`text-3xl mt-2`} onClick={() => {setIsPlaying(false); audioFile.pause();}}>
            <MdOutlinePauseCircleFilled />
          </button>
        )}
      </>
    )}
  </>
);
}
export default RecordAndListnenAudio