import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
//import { useSelector } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import 'swiper/css/bundle';
import Card from "../components/Card";
import axios from "axios";
import {FaShare,} from 'react-icons/fa';
//import { format } from "timeago.js";
import Contact from '../components/Contact';
import ReactPlayer from 'react-player';
import { setCurrentVideo,fetchSuccess, like, dislike } from '../redux/videoSlice';
//import Recommendation from '../components/Recommendation';
import UserPosts from '../components/UserPosts';

const Container = styled.div`
display: flex;
gap: 24px;
padding: 50px 20px;
`;

const Content = styled.div`
flex: 5;
`;
const VideoWrapper = styled.div``;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Title = styled.h1`
font-size: 18px;
font-weight: 400;
margin-top: 20px;
margin-bottom: 10px;
color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Recommendation = styled.div`
  flex: 2;

  height: 1000px; // Set the desired height for the recommendation section
  overflow-y: scroll; // Enable vertical scrolling

`;
const Post = () => {
    SwiperCore.use([Navigation]);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const params = useParams()
    
    const [author, setAuthor] = useState(null);
    const [users, setUsers] = useState([]);
    
    // *****add user videos
    const {currentUser} = useSelector((state) => state.user); 
    const { currentVideo } = useSelector((state) => state.video);
    const dispatch = useDispatch();
  
    const path = useLocation().pathname.split("/")[2]  
    const [channel, setChannel] = useState({})
    //console.log(currentUser, "this is current")
  
  
  //__________________--

    useEffect (() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/get/${params.postId}`);
                const data = await res.json();
              // ****** add user videos
                // const videoRes = await axios.get(`/api/post/get/${path}`)
                // const channelRes = await axios.get(`/api/user/posts/${videoRes.data.userId}`)
             //console.log(path)
                const videoRes = await axios.get(`/api/post/get/${path}`)
                //const channelRes = await axios.get(`/api/user/posts/${videoRes.data._id}`)
                const channelRes = await axios.get(`/api/post/user/${videoRes.data.userRef}`)
                //console.log("video", channelRes.data)
              //-------------------
                setAuthor(true);
                //console.log(data)
              //  console.log(data.mediaUrls[0].includes('.webm' || 'video/mp4')? 'video/webm' : 'image/png')
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
            }
            //console.log("test", res, videoRes)
            setPost(data);
            setLoading(false);
            setError(false);
          
            // ********add 
            setChannel(channelRes.data)
            //console.log("this", channel)
            dispatch(setCurrentVideo(videoRes.data))
            dispatch(fetchSuccess(videoRes.data))
            //---------
            } catch (error) {
               setError(true); 
               setLoading(false);
            }
        };
        fetchPost();
    }, [params.postId, path, dispatch]);

    const formatCreatedDate = (createdAt) => {
      const postDate = new Date(createdAt);
      return postDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

      //need to create a function that gets the post.userRef and uses that to fetch the user api/user and output the username --> Done

    useEffect(() => {
      // Fetch user data from your database or API and store it in the state
      const fetchUser = async (userId) => {
        try {
          const response = await fetch(`/api/user/find/${userId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const userData = await response.json();
          setUsers(userData.username);
           //console.log('user', users)
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
       // Fetch usernames for all posts if they aren't already fetched
      if (post) {
        fetchUser(post.userRef);
      }
   ;
  }, [post, users]);

  return (
    <div>
    <div className='flex flex-col p-2 px-3  mx-auto'>
             <h2 className='text-blue-700 font-bold text-2xl lg:text-4xl mx-auto text-center'>{users} Moments</h2> 
         </div>
    <Container>
      <Content>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        
        {error && <div className='text-red-700 text-center  my-7 text-2xl'>Something went wrong
        <Link to={`/`} className="text-slate-700 p-4 text-sm font-semibold uppercase cursor-pointer hover:opacity-75" >
        <p>Home</p>
        </Link>
        </div> }
        
        {post && !loading && !error && ( 
        <div>
          {/* <Swiper navigation>
            {post.mediaUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'contain',
                  }}
                ></div>
                <div className="h-[550px]">
                  <ReactPlayer url={url} playing={true} controls 
                  width="100%"
                  height="100%" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper> */}

          {/* testign media player */}
          <Swiper navigation>
            {post.mediaUrls.map((url) => (
              <SwiperSlide key={url}>
                {url.includes('.webm' || 'video/mp4') ? (
                  <div className="h-[550px]">
                    <ReactPlayer
                      url={url}
                      controls
                      width="100%"
                      height="100%"
                    />
                    {/* <ReactPlayer
                      url={url}
                      config={{
                        file: {
                          attributes: {
                            type: getVideoType(url),
                          },
                        },
                      }}
                      controls
                      width="100%"
                      height="100%"
                    /> */}
                  </div>
                ) : (
                  <div
                    className="h-[550px]"
                    style={{
                      background: url.length > 0 ? `url(${url}) center no-repeat`: 'none',
                      backgroundSize: 'contain',
                      display:'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {url.length < 1 ? null : <span>No Image Found</span>}
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* testing end */}

          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (<p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>Link Copied!</p>)}

          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 '>
            <p className='text-2xl font-semibold'>
              {post.title} 
            </p>
            {/* <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {post.location}
            </p> */}
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Posted - </span>
              {formatCreatedDate(post.createdAt)}
            </p>

            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Caption - </span>
              {post.caption}
            </p>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {post.description}
            </p>
            {/* <p>Author: {author}</p>  Need to add author */}
            {/* <p>Author: {getAuthorName(post.userRef)}</p> */}
            {/* {post.userRef} */}
            {/* <p>Author: {users || 'Loading...'}</p> */}
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Author - </span>
              {users}
            </p>
            
            {/* <p>{post.username}</p> */}
            <ul className='text-blue-500 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                {post.tags.map((tag, index) => (
                    <li key={index} className='flex items-center gap-1 whitespace-nowrap'>
                    {`#${tag}`}
                    </li>
                ))}
                </ul>
            {currentUser && post.userRef !== currentUser._id && !contact &&(
              
                <button
                    onClick = {() => setContact(true)}
                    className="bg-slate-700 text-white rounded-lg uppercase p-3 hover:opacity-95"
                >Contact Author </button>      
            )}
            {contact && <Contact post={post} /> }
          </div>
          
        </div>
        )}
        </Content>
        {/* <div> */}
        {/* {channel._id} */}
        {/* {channel.map(post)} */}
        {/* {channel.length > 0 ? channel.map((video) => (
        <Card type="sm" key={video._id} video={video} /> 
      )) : "no post"}
        </div> */}
        
         {/* <div>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </div> */}
    {/* <UserPosts channel={channel} /> */}
    <Recommendation>
    <h1 className='text-blue-700 font-bold'>MORE STORIES from {users}</h1>
    <UserPosts post={currentVideo.userRef}  />
    {/* <Recommendation tags={currentVideo.tags} /> */}
    </Recommendation>
    
    </Container>
    </div>
  );
};
export default Post