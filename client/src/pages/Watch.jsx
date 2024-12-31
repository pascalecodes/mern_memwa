import React from 'react'
import { useEffect, useState } from 'react';
import styled from 'styled-components'
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Card from "../components/Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { format } from "timeago.js";
import { Link } from 'react-router-dom';
// import Comments from '../components/Comments';
import ReactPlayer from 'react-player';
//import Recommendation from "../components/Recommendation";
import { setCurrentVideo,fetchSuccess} from '../redux/videoSlice';


const Container = styled.div`
display: flex;
gap: 24px;
padding-top: 30px;
padding-bottom: 30px;
padding-left: 24px;
`;

const Content = styled.div`
flex: 5;

`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
font-size: 18px;
font-weight: 400;
margin-top: 20px;
margin-bottom: 10px;
color: ${({ theme }) => theme.text};
text-transform: capitalize;
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

const Recommendation = styled.div`
  flex: 2;

  height: 1000px; // Set the desired height for the recommendation section
  overflow-y: scroll; // Enable vertical scrolling

  @media (max-width: 768px) { // Adjust for mobile screens
    flex: none; // Reset flex to allow stacking
    height: auto; // Allow height to adjust based on content
    position: relative; // Position relative for stacking
    margin-top: 20px; // Add margin to separate from other sections
    width: 100%; // Ensure it takes full width on mobile
  }
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
  text-transform: capitalize;
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


export default function Watch() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [src, setSrc] = useState(''); // State for src
  //const { currentVideo } = useSelector((state) => state.video);
  //const [currentVideo, setVideo ] = useState('');
  const params = useParams()
  const path = useLocation().pathname.split("/")[2] 
  // *******new adds
  //const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const [currentPost, setCurrentPost] = useState(posts[0]);
  // const path = useLocation().pathname.split("/")[2];
  // console.log(path, "this is current", currentVideo)
// -----------------
const [currentIndex, setCurrentIndex] = useState(0);



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        //const res = await fetch(`/api/post/get?order=desc&limit=4`);
        //const res = await axios.get(`/api/posts?order=desc`);
        const res = await fetch(`/api/post/get?order=desc`);
        //const res = await fetch(`/api/posts?order=desc`);
        const data = await res.json();
        //const data = await res.data
         //const videoRes = await axios.get(`/api/post/get/${path}`)
        //  const videoRes= await axios.get(`/api/posts`)
        //  const channelRes = await axios.get(`/api/post/user/${videoRes.data[0].userRef}`)

        // *********NEW

        // const videoRes = await axios .get(`/api/post/find/${path}`)
        // //const channelRes = await axios .get(`/api/users/find/${videoRes.data.userId}`)
        // //setChannel(channelRes.data)
        // dispatch(fetchSuccess(videoRes.data))
        // ------------

        setPosts(data);
        //console.log(data[0].userRef)
        //setPosts(videoRes.data);
        console.log(posts)
        const userId= data[0].userRef
        //const response =  await fetch(`/api/user/${userId}`);
        const response =  await axios.get(`/api/user/find/${userId}`);
        //console.log('response', response.data.username)
        //const userData = await response.json();
        //const author = userData.username
        const author = response.username
        //setVideo(mediaUrls) // get video
        setUser(response.data.username);
        //console.log('user', user)
        // dispatch(setCurrentVideo(data))
        // dispatch(fetchSuccess(data))
        //dispatch(fetchSuccess(videoRes.data))
      } catch (error) {
        console.log(error);
      }
    }
  
    fetchPosts();
  }, []);

  // const { currentVideo, relatedVideos } = posts;
  // console.log(currentVideo)

  if (posts.length === 0) {
    return <div>Loading...</div>;
  }


  const handleNext = (posts) => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
    console.log(currentIndex)
};

const handlePrev = (posts) => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
  
};
  //const { mediaUrls, title , caption, tags, createdAt, userRef, user } = posts[0];
  //console.log(`media: ${mediaUrls}}`)
  // const videoLink = ({video}) => {
    
    //showVid ()
  // if (video){
  //  const mediaUrls = video
  //  return mediaUrls
  // } else {
  //   const { mediaUrls, title , caption, tags, createdAt, userRef, user } = posts[0];
  //   return mediaUrls
  // }
//}
//let { mediaUrls, title , caption, tags, createdAt, userRef, user } = posts[0];

// const handleCardClick = (i) => {
//   const video = posts[0].mediaUrls[0] // this is hardcoded I want to replace the hard coding with dynamic when the card is clicked
//   const videoId = posts[0]._id
//   setSrc(video); // Update src to video URL from the card
//   console.log('this', videoId)
//   //return src
// };

  // const calculateDaysSinceCreation = (createdAt) => {
  //   const postDate = new Date(createdAt);
  //   const currentDate = new Date();
  //   const timeDiff = Math.abs(currentDate.getTime() - postDate.getTime());
  //   const daysSinceCreation = Math.ceil(timeDiff / (1000 * 3600 * 24));
  //   return daysSinceCreation;
  // };

  // const formatDate = (date) => {
  //   const options = { month: 'long', day: 'numeric', year: 'numeric' };
  //   //return date.toLocaleDateString('en-US', options);
  //   return date
  // };

  // const formatCreatedDate = (createdAt) => {
  //   const postDate = new Date(createdAt);
  //   return postDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  // };

  //work on getting post to watch page
   // Function to handle click on a post
   const handlePostClick = (post) => {
    setCurrentPost(post);
    console.log('click test', post)
    };

  return (
    <div>
       <div className='flex flex-col p-2 px-3  mx-auto'>
                <img className="mx-auto " src="/img/logo.svg"  alt="Memwa" width="sm-80" height="sm-80"  />
                <h1 className='text-blue-700 font-bold text-2xl lg:text-4xl mx-auto text-center'>Memwa WATCH</h1> 
                <h5 className='mx-auto text-center'>Watch stories from everywhere</h5>
            </div>
    <Container>
      <Content>
     
        <VideoWrapper>
          <iframe 
            width="100%" 
            height="720" 
            //src="https://www.youtube.com/embed/_A20kVsaqIk?si=GvLxnWd3On6YpPI-" 
            src={posts[0].mediaUrls || posts[currentIndex].mediaUrls} //posts[0].mediaUrls || 
            title="video player" 
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen>
         </iframe>
        </VideoWrapper>
        {/* <button 
                onClick={handlePrev} 
                style={{ position: 'absolute', left: '100px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
            >
                &lt; Prev
            </button>
            <button 
                onClick={handleNext} 
                style={{ position: 'absolute', right: '700px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
            >
                Next &gt;
            </button> */}
         

        <Link to={`/post/${posts[0]._id}`} style={{textDecoration:"none"}}> 
        <Title>{posts[currentIndex].title}</Title> 
         {/* posts[0] */}
        </Link>
        {/* add real author from post and post info */}
        <ChannelName>{posts[0].caption}</ChannelName>
        <p>{posts[currentIndex].tags}</p>
        {/* posts[0] */}
        <Details>
          <Info>5,938,514 views • {format(posts[currentIndex].createdAt)}</Info>
          <Buttons>
            <Button>
              <ThumbUpOutlinedIcon /> 123
            </Button>
            <Button>
              <ThumbDownOffAltOutlinedIcon /> Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src="https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png" />
            <ChannelDetail>
              <ChannelName  >{user}</ChannelName>
              <ChannelCounter>200K subscribers</ChannelCounter>
              <Description>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Doloribus laborum delectus unde quaerat dolore culpa sit aliquam
                at. Vitae facere ipsum totam ratione exercitationem. Suscipit
                animi accusantium dolores ipsam ut.
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe>SUBSCRIBE</Subscribe>
        </Channel>
        <Hr />
        {/* <Comments/> */}
      </Content>
      <Recommendation >
      <h1 className='text-blue-700 font-bold'>EXPLORE MORE STORIES</h1>
      
      {/* <Card onClick={() => handleCardClick(posts)}type="sm"/> {src} */}
        {/* <Card type="sm" key={posts._id} video={posts}/> */}
        {/* <Card type="sm" key={posts._id} posts={posts} /> */}
        {/* <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/> */}
         {posts.map((video) => (
        <Card type="sm" key={video._id}  video={video} />
      ))}

      </Recommendation>
      {/* <Recommendation tags={tags}/> */}
    </Container>
    </div>
  )  
}

