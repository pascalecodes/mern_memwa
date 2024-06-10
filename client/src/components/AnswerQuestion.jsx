import React, { useState, useRef } from 'react'
import UploadPost from '../components/UploadPost';
import Capture from '../pages/Capture';

const AnswerQuestion = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const mediaRecorderRef = useRef(null); // useRef hook to store MediaRecorder instance
  const liveVideoFeed= useRef(null);
  const [recordingStatus, setRecordingStatus] = useState('');

  const startRecording = async () => {
    setIsRecording(true);
    setRecordingStatus('Recording in progress...');
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      
      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorder.ondataavailable = (e) => setRecordedVideo(e.data);
      mediaRecorderRef.current = mediaRecorder; // Store reference in useRef
      mediaRecorder.start();
      liveVideoFeed.current.srcObject = mediaStream;
    } catch (error) {
      console.error('Error capturing video:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
   
    if (mediaRecorderRef.current) {
      const recordedBlob = new Blob(mediaRecorderRef.current.stop(), {type: 'video/webm'}); // Use reference to stop recording
    //   const recordedBlob = new Blob(mediaRecorderRef.current.chunks, { type: 'video/webm' });
 
    setRecordedVideo(recordedBlob);
    setIsRecording(false);
    setRecordingStatus('');
    }
  };

  return (
    
    <div >
        <video ref={liveVideoFeed} autoPlay muted className='overlay'/> 
        <div>{recordingStatus}</div>
        <button className='text-white text-center bg-green-700 p-2 hover:opacity-80 mr-3' onClick={startRecording} disabled={isRecording}> Start
      </button>
      <button className='text-white text-center bg-red-700 p-2 hover:opacity-80 ml-3' onClick={stopRecording}> Stop
      </button>

      {recordedVideo && (
        <div>
          <video src={URL.createObjectURL(recordedVideo)} controls type="video/webm"/>
          <button className='text-white text-center bg-red-700 p-2 mr-3' onClick={() => setRecordedVideo(null)}>Re-record</button>
          {/* <button className='text-white text-center bg-blue-700 p-2 ml-3' >Upload</button> */}
          <UploadPost
          file={recordedVideo}
          onUploadComplete={() => setRecordedVideo(null)}
        />
        </div>
        
      )}
      
    </div>
  )
}


export default AnswerQuestion
