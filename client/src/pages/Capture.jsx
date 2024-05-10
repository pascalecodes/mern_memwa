import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCamera, FaMicrophone, FaUpload, } from 'react-icons/fa';

const Container = styled.div`
`;

function Capture() {
  const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);

    const getCameraPermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    return (
        <Container>
            <div className='flex flex-col p-2 px-3  mx-auto'>
                <img className="mx-auto " src="/img/logo.svg"  alt="Memwa" width="sm-80" height="sm-80"  />
                <h1 className='text-blue-700 font-bold text-2xl lg:text-4xl mx-auto text-center'>Memwa CAPTURE</h1> 
                <h5 className='mx-auto text-center'>Record or upload a new moment.</h5>
            </div>
            <main className='flex'>
                <div className='mx-auto' id="capture-page-sec">
                    <h3 className='text-blue-700 font-bold text-xl lg:text-2xl text-center'>RECORD
                    <FaCamera  className='mx-auto'/></h3>
                    <div className='mx-auto'>
                        <p>Press START to record directly from your device</p>
                    </div>
                </div>

                <div className='mx-auto' id="capture-page-sec">
                    <h3 className='text-blue-700 font-bold text-xl lg:text-2xl text-center'>UPLOAD
                    <FaUpload className='mx-auto'/></h3>
                    
                    <div className='mx-auto'>
                        <p>You can upload videos, pictures, files</p>
                    </div>
                </div>

               
                {/* <div className="video-controls">
                    {!permission ? (
                        <button onClick={getCameraPermission} type="button">
                            Get Camera
                        </button>
                    ):null}
                    {permission ? (
                        <button type="button">
                            Record Button goes here
                        </button>
                    ):null}
                </div> */}
            </main>
            <div className="px-4 py-5 my-5 text-center">
                <Link to={`/profile`} className='bg-blue-700 text-white p-2 rounded-lg uppercase hove:opacity-95'>Return to Profile</Link>
            </div> 
        </Container>
    );
}

export default Capture
