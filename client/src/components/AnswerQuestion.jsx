import React, { useState, useRef } from 'react'

  

const AnswerQuestion = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const mediaRecorderRef = useRef(null); // useRef hook to store MediaRecorder instance

  const startRecording = async () => {
    setIsRecording(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorder.ondataavailable = (e) => setRecordedVideo(e.data);
      mediaRecorderRef.current = mediaRecorder; // Store reference in useRef
      mediaRecorder.start();
    } catch (error) {
      console.error('Error capturing video:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop(); // Use reference to stop recording
    }
  };

  return (
    <div>
        <button className='text-white text-center bg-green-700 p-2 hover:underline gap-4' onClick={startRecording} disabled={isRecording}>
        {/* {isRecording ? 'Stop Recording' : 'Record Answer'} */} Start Recording
      </button>
      <button className='text-white text-center bg-red-700 p-2 hover:underline gap-4' onClick={stopRecording} >
        {/* {isRecording ? 'Stop Recording' : 'Record Answer'} */} Stop Recording
      </button>

      {recordedVideo && (
        <div>
          <video src={URL.createObjectURL(recordedVideo)} controls />
          <button className='text-white text-center bg-red-700 p-2' onClick={() => setRecordedVideo(null)}>Re-record</button>
        </div>
      )}
      
    </div>
  )
}


export default AnswerQuestion
