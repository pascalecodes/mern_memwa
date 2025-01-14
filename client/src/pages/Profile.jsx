import { useSelector } from "react-redux"
import styled from 'styled-components'
import { useRef, useState, useEffect } from "react"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess } from "../redux/user/userSlice"
import { useDispatch } from "react-redux"
import { Link } from 'react-router-dom'

const Container = styled.div`
display: flex;
gap: 5px;
padding: 5px 5px;
`;

const Content = styled.div`
flex: 50;
`;

const Recommendation = styled.div`
  flex: 50;

  height: 1000px; // Set the desired height for the recommendation section
  overflow-y: scroll; // Enable vertical scrolling

`;

export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser, loading, error} = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [showPostsError, setShowPostsError] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const dispatch = useDispatch(); 


  useEffect(()=> {
    if (file) {
      handleFileUpload(file)
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)
   
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePerc(Math.round(progress))
      },
      (error) => { 
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
          setFormData({ ...formData, avatar: downloadURL}))
      }
    )
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });
      const data = await res.json()
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      })
      const data = await res.json();
      if(data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data))

    } catch (error){
      dispatch(deleteUserFailure(error.message));
    }
  };

    const handleSignOut = async () => {
      try {
        dispatch(signOutUserStart());
        const res = await fetch('/api/auth/signout');
        const data  = await res.json();
        if (data.success === false){
          dispatch(signOutUserFailure(data.message))
          return;
        }
        dispatch(signOutUserSuccess(data))
      } catch(error) {
        dispatch(signOutUserFailure(data.message))
      }
  };

  const handleShowPosts = async () => {
    try {
      setShowPostsError(false);
      const res = await fetch(`/api/user/posts/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowPostsError(true);
        return;
      }
      setUserPosts(data);
    } catch (error) {
      setShowPostsError(true); 
    }
  };

  const handlePostDelete = async (postId) => {
    try {
      const res = await fetch (`/api/post/delete/${postId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (error){
      console.log(error.message);
    }

  };

   // Create an array to hold the IDs of answered questions
   const answeredQuestionIds = userPosts.map(post => post.title); // Assuming 'id' holds the ID of the question related to the post

  //  const AnsweredQuestions = ({ questions, answeredIds }) => {
  //   // Filter questions to get titles of the questions corresponding to the answered IDs
  //   const answeredQuestions = questions.filter(question => answeredIds.includes(question._id));}
  

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-blue-700 font-bold text-2xl lg:text-4xl mx-auto text-center'>Profile</h1> 
      {/* <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1> */}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4"> 
        <input onChange={(e)=> setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/> 
        <img onClick={()=>fileRef.current.click()} 
        src={formData.avatar || currentUser.avatar} alt='profile' className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
        <p className="text-sm self-center">
          {fileUploadError ? 
          (<span className="text-red-700">Error Image Upload(must be less than 2 mb) </span>) :
          filePerc > 0 && filePerc < 100 ?  
          (<span className="text-slate-700 ">{`Uploading ${filePerc}%`}</span>) :
          filePerc === 100 ? 
            (<span className="text-green-700">Image Successfully Uploaded</span> )
            : ""
          } 
        </p> 
        <p className='text-blue-700 text-center'>Edit and Change your profile picture, information, password  or moments you have </p>
        <input type='text' placeholder="Username" defaultValue= {currentUser.username} id='username' className="border p-3 rounded-lg" onChange={handleChange}/>
        <input type='email' placeholder="Email" defaultValue={currentUser.email} id='email' className="border p-3 rounded-lg" onChange={handleChange}/>
        <input type='password' placeholder="Password" onChange={handleChange} id='password' className="border p-3 rounded-lg"/>
        <input type='text' placeholder="First Name" defaultValue={currentUser.firstName} id='firstName' className="border p-3 rounded-lg" onChange={handleChange}/>
        <input type='text' placeholder="Last Name" defaultValue={currentUser.lasttName} id='lastName' className="border p-3 rounded-lg" onChange={handleChange}/>
        <input type='text' placeholder="Bio" onChange={handleChange} id='bio' defaultValue={currentUser.bio} className="border p-3 rounded-lg"/>
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">{loading ? 'Loading...': 'Update'}</button>
        <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95" to={"/create-post"}> 
         Create a Moment 
      </Link>
      </form>
      
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? 'User is updated successfully!' : ''}</p>
      <button onClick={handleShowPosts} className="text-green-700 w-full">Show Posts
      </button>
      
      <p className="text-red-700 mt-5">{showPostsError ? 'Error showing posts' : ''}</p>
     
      {userPosts && userPosts.length > 0 && (
     <div className="flex flex-col gap-4">
      <h1 className="text-blue-700 text-center text-2xl font-semibold">Your Posts</h1>
       {userPosts.map((post) => (
      <div key ={post._id} className="border rounded-lg p-3 flex justify-between items-center gap-4">
        <Link to={`/post/${post._id}`}> 
        {post.mediaUrls && post.mediaUrls.length > 0 ? (
        <img
                  src={post.mediaUrls[0].includes('.jpg') || post.mediaUrls[0].includes('.jpeg') || post.mediaUrls[0].includes('.png')
                    ? post.mediaUrls[0]
                    : 'https://i.pinimg.com/originals/4e/08/f5/4e08f596f8fc6eb3c1eee8295b40bae4.jpg'}
                 
                  alt='post cover'
                  className='h-16 w-16 object-contain'
                />
              ) : (
                <img
                  src="https://i.pinimg.com/originals/4e/08/f5/4e08f596f8fc6eb3c1eee8295b40bae4.jpg"
                  alt="post cover"
                  className="h-16 w-16 object-contain"
                />
              )}
        </Link>
        <Link to={`/post/${post._id}`} className="text-slate-700 font-semibold  hover:underline truncate flex-1" >
        <p >{post.title}</p>
        </Link>
        <div className="flex flex-col items-center">
          <button onClick={()=>handlePostDelete(post._id)} className="text-red-700 uppercase">Delete</button>
          <Link to={`/update-post/${post._id}`}>
          <button className="text-green-700 uppercase">Edit</button>
          </Link>
        </div>
      </div>
      ))}
{/* Not using the below until replaced with real answered questions */}
      <div className="hidden">
      <h2 className="text-blue-500 text-xl font-semibold">Answered Questions</h2>
      <ul>
        {answeredQuestionIds.map(post => (
          <li key={post._id} className="border-b p-2">
            {post} {/* Assuming each question has a 'title' property */}
          </li>
        ))}
      </ul>
    </div>
     </div>
      )}
     
     
      
    </div>
  );

//    //not real questions answered just posts by user will have to add question ID to post schema to use and update 
//    const AnsweredQuestions = ({ posts, answeredIds }) => {
//     // Filter questions to get titles of the questions corresponding to the answered IDs
//     const answeredQuestions = posts.filter(post => answeredIds.includes(post._id));

//   return (
//     <div>
//       <h2 className="text-blue-500 text-xl font-semibold">Answered Questions</h2>
//       <ul>
//         {answeredQuestions.map(post => (
//           <li key={post._id} className="border-b p-2">
//             {post.title} {/* Assuming each question has a 'title' property */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
}


