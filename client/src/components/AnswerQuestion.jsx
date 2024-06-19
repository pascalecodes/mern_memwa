import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import {useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom';
import { FaCamera, FaUpload, FaCog } from 'react-icons/fa';

const Container = styled.div`
`;



function AnswerQuestion({ questionId}) {
    const {currentUser} = useSelector(state => state.user);
    const navigate = useNavigate();
    const [isUploadPageVisible, setIsUploadPageVisible] = useState(false);
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        mediaUrls: [],
        title: '',
        caption: '',
        description: '',
        tags:[],
        privacy: false,
        cloudinaryId: '',
        likes: 0,
    });

    const [uploading, setUploading] = useState(false);
    const [mediaUploadError, setMediaUploadError] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const mimeType = "video/webm";
    const mediaRecorder = useRef(null);
    const liveVideoFeed= useRef(null);
    //const [liveVideoFeed, setLiveVideoFeed]= useState(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [videoChunks, setVideoChunks] = useState([]);
    const [recordedVideo, setRecordedVideo] = useState(null);
    const fileInputRef = useRef(null);
    const [uploadedQuestionIds, setUploadedQuestionIds] = useState([]);
    const [answerCount, setAnswerCount] = useState(0);

    useEffect(() => {
        // Load the uploaded question IDs from localStorage when the component mounts
        const storedIds = localStorage.getItem(`uploadedQuestionIds_${currentUser.userId}`);
        if (storedIds) {
          setUploadedQuestionIds(JSON.parse(storedIds));
        }
      }, [currentUser.userId]);

    const handleMediaSubmit = (e) => {
        if (files.length > 0 && files.length + formData.mediaUrls.length < 7) {
            setUploading(true);
            setMediaUploadError(false);
          const promises = [];
    
          for (let i = 0; i < files.length; i++) {
            promises.push(storeMedia(files[i]));
          }
          Promise.all(promises).then((urls) => {
            setFormData({ ...formData, mediaUrls: formData.mediaUrls.concat(urls)
            });
            setMediaUploadError(false);
            setUploading(false)
          }).catch((err) => {
            setMediaUploadError('Image upload failed (2.5mb max per file)');
          })
        }else {
            setMediaUploadError('You can only upload 6 files per post');
            setUploading(false);
        }
    };

    const storeMedia = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            console.log(fileName)
            uploadTask.on(
                'state_changed', 
                (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);               
            },
            (error) => {
                reject(error);
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {resolve(downloadURL)
                });
            }
        );
    }); 
    };
  
    const handleRemoveMedia = (index) => {
        setFormData ({
        ...formData,
        mediaUrls: formData.mediaUrls.filter((_, i) => i !== index),  
        });

    }

    const handleChange = (e) => {
        //testing adding tags into array
    
        if (
            e.target.id === 'privacy') {
            setFormData({
                ...formData, [e.target.id]: e.target.checked,
            });
        }


        if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (formData.mediaUrls.length < 1 )
            return setError('You must upload at least one image');
            setLoading(true);
            setError(false);
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }
            navigate(`/post/${data._id}`)
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
  
      const handleUpload = async () => {
        if (recordedVideo) {
            setIsUploadPageVisible(true);
          try {
            setUploading(true);
            setMediaUploadError(false);
    
            // Fetch the file content from the Blob URL
            const response = await fetch(recordedVideo);
            const file = await response.blob();
    
            const fileType = 'video/webm'; // or any other supported format
            const fileName = `-answer-${questionId}.webm` ;
            const fileToUpload = new File([file], fileName, {
              type: fileType
            });
            console.log(recordedVideo, fileName, fileToUpload)
    
            const downloadURL = await storeMedia(fileToUpload);
            // Update your form data with the downloadURL
            setFormData((prevFormData) => ({
              ...prevFormData,
              mediaUrls: [...prevFormData.mediaUrls, downloadURL]
            }));
            setUploading(false);
          } catch (err) {
            setMediaUploadError('Image upload failed (2.5mb max per file)');
            setUploading(false);
            console.error(err);
          }
        } else {
          // There's no recorded video, so do nothing
        }
      };
    
    
    const getCameraPermission = async () => {
        
        // setRecordedVideo(null);
        if ("MediaRecorder" in window) {
            try {
                const videoConstraints = {
                    audio: false,
                    video: true,
                };
                // const audioConstraints = { audio: true };
                // // create audio and video streams separately
                // const audioStream = await navigator.mediaDevices.getUserMedia(
                //     audioConstraints
                // );
                // const videoStream = await navigator.mediaDevices.getUserMedia(
                //     videoConstraints
                // );
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setPermission(true);

                //combine both audio and video streams
                // const combinedStream = new MediaStream([
                //     ...videoStream.getVideoTracks(),
                //     ...audioStream.getAudioTracks(),
                // ]);
                // setStream(combinedStream);

                //combine  streams
                // const combinedStream = new MediaStream([
                //     ...videoStream.getVideoTracks(),
                //     ...audioStream.getAudioTracks(),
                // ]);
                setStream(mediaStream);

                // Ensure liveVideoFeed is a valid video element before assigning srcObject
                // if (liveVideoFeed.current) {
                //     liveVideoFeed.current.srcObject = videoStream;
                // } else {
                //     console.error('liveVideoFeed element not yet available');
                // }
                //set videostream to live feed player
                //liveVideoFeed.current.srcObject = videoStream;
                liveVideoFeed.current.srcObject = mediaStream;
                
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };


    const startRecording = async () => {
        setRecordingStatus("recording");
        getCameraPermission()
        const media = new MediaRecorder(stream, { mimeType });
        mediaRecorder.current = media;
        mediaRecorder.current.start();
        let localVideoChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localVideoChunks.push(event.data);
        };
        setVideoChunks(localVideoChunks);
        
    };

    const stopRecording = () => {
        // setPermission(false);
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            const videoBlob = new Blob(videoChunks, { type: mimeType });
            const videoUrl = URL.createObjectURL(videoBlob);
            setRecordedVideo(videoUrl);
            setVideoChunks([]);
            liveVideoFeed.current.srcObject = null;
        };
    };

    const handleQuestionUpload = () => {
        // Add the questionId to the uploadedQuestionIds array
        setAnswerCount(answerCount + 1);
        setUploadedQuestionIds([...uploadedQuestionIds, questionId]);
        console.log(uploadedQuestionIds, questionId, answerCount)
        localStorage.setItem(`uploadedQuestionIds_${currentUser.userId}`, JSON.stringify(uploadedQuestionIds));
    };
    // fix questions uploaded ***********
   

    return (
        <Container>
            <main className='flex flex-col sm:flex-row p-4'>
                <div className='mx-auto' id="capture-page-sec">
                    <div>
                        <div className=" p-3 video-controls">
                            {!permission ? (
                                <button onClick={getCameraPermission} type="button" className='mx-auto text-center  bg-slate-300 rounded-lg'>
                                    {!permission ?  ( <> <FaCamera  className='mx-auto'/> Enable to Answer</>) : ('Camera Active') }
                                </button>
                            ): null }
                            <video ref={liveVideoFeed} autoPlay muted className='overla'/> 
                            {permission && recordingStatus === "inactive" ? (
                                
                                <button onClick={startRecording}  type="button" className='p-3 bg-green-700 text-white rounded-lg uppercase  hover:opacity-95 disabled:80'>
                                    Start
                                </button>
                                
                            ) : null}
                            {recordingStatus === "recording" ? (
                                <button onClick={stopRecording} type="button" className='p-3 bg-red-700 text-white rounded-lg uppercase  hover:opacity-95 disabled:80'>
                                     Stop
                                </button>
                            ) : null}
                            {recordedVideo ? (
                                
                            <div className="video-player">
                                <video src={recordedVideo} controls></video>
                                <a download href={recordedVideo} style={{ fontStyle: 'italic', color: 'blue' }}>Download Recording</a>
                            
                            <button className='mx-auto text-red-700 p-3  border border-red-700 rounded uppercase hover:shadow-lg disabled:opacity-80' onClick={() => setRecordedVideo(null)}>Re-record</button>
                                
                            <button
                                disabled={uploading}
                                type="button"
                                onClick={handleUpload}
                                className="mx-auto p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
                            >
                                {uploading ? 'Uploading...' : 'Upload'}
                            </button>
                                </div>
                            ) : null}

                        </div>
                    </div>
                </div>
                
                {isUploadPageVisible && (
                <div className='mx-auto' id="upload-page-sec">
                    <p className='text-blue-700 font-bold text-md lg:text-l text-center pb-2'>Add information to your answer and upload to our servers.</p>
                    <div>
                        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
                            <div className='flex flex-col gap-4 flex-1'>
                                <input type="text" placeholder='Title' className='border p-3 rounded-lg' id='title' maxLength='62' minLength='4' required
                                onChange={handleChange}
                                value={formData.title}/>
                                <input type="text" placeholder='Caption' className='border p-3 rounded-lg' id='caption' required
                                onChange={handleChange}
                                value={formData.caption}/>
                                <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required
                                onChange={handleChange}
                                value={formData.description}/>
                                <input type="text" placeholder='Tags' className='border p-3 rounded-lg' id='tags'
                                onChange={handleChange}
                                value={formData.tags}/>
                                <div className='flex gp-6 flex-wrap'>
                                    <div className='flex gap-2'>
                                        <input type="checkbox" id="privacy" className='w-5' 
                                        onChange={handleChange}
                                        checked={formData.privacy}/>
                                        <span>Make Private</span>
                                    </div>
                                </div> 

                                <p className='font-semibold text-center'> Media (max 6): 
                                </p>
                                <div className='flex gap-4'>
                                <input onChange={(e) => setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type="file" id='media' accept='image/*, video/*, audio/*' multiple />
                                <button disabled={uploading} type="button"  onClick={handleMediaSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
                                    {uploading ? 'Uploading...' : 'Upload'}
                                    </button>
                                </div>
                                <p className="text-red-700 text-sm">{mediaUploadError && mediaUploadError}</p>
                                {
                                    formData.mediaUrls.length > 0 && formData.mediaUrls.map((url, index) => (
                                        <div key={url} className="flex justify-between p-3 border items-center"> 
                                            <img src={url} alt='Posting image' className="w-20 h-20 object-contain rounded-lg" />
                                            <button type='button' onClick={() => handleRemoveMedia(index)} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">Delete</button>
                                        </div>   
                                    ))
                                }

                                <button disabled={loading || uploading} onClick={handleQuestionUpload} className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:80'>{loading ? 'Saving...' : 'Upload Moment'}</button>
                       
                                {error && <p className="text-red-700 text-sm">{error}</p>}
                            </div>
                        </form>
                        
                    </div>
               
                </div>
                 )}
                       {/* Display the uploaded question IDs */}
              {/* <div>
                <h3>Uploaded Questions:</h3>
                <p>{answerCount}</p>
                <ul>
                  {uploadedQuestionIds.map((id) => (
                    <li key={id}>{id}</li>
                  ))}
                </ul>
              </div> */}

            </main> 
        </Container>
    );
}


export default AnswerQuestion
