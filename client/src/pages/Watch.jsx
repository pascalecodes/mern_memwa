import React from 'react'
import { useEffect, useState } from 'react';
import styled from 'styled-components'
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Card from "../components/Card";
//import { useDispatch, useSelector } from "react-redux";
// import Comments from '../components/Comments';
import ReactPlayer from 'react-player';


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
  const [users, setUsers] = useState([]);
  const [src, setSrc] = useState(''); // State for src
  //const { currentVideo } = useSelector((state) => state.video);
  const [currentVideo, setVideo ] = useState('');
 
  // const { currentUser } = useSelector((state) => state.user);
  // const { currentVideo } = useSelector((state) => state.video);
  // const dispatch = useDispatch();

  // const path = useLocation().pathname.split("/")[2];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        //const res = await fetch(`/api/post/get?order=desc&limit=4`);
        const res = await fetch(`/api/post/get?order=desc&limit=1`);
        const data = await res.json();
        setPosts(data);
        const userId= data[0].userRef
        const response =  await fetch(`/api/user/${userId}`);
        const userData = await response.json();
        const author = userData.username
        //setVideo(mediaUrls) // get video
        setUsers(author);
        //console.log(author)
      } catch (error) {
        console.log(error);
      }
    }
  
    fetchPosts();
  }, [users]);

  // const { currentVideo, relatedVideos } = posts;
  // console.log(currentVideo)

  if (posts.length === 0) {
    return <div>Loading...</div>;
  }

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
let { mediaUrls, title , caption, tags, createdAt, userRef, user } = posts[0];

const handleCardClick = (i) => {
  const video = posts[0].mediaUrls[0] // this is hardcoded I want to replace the hard coding with dynamic when the card is clicked
  setSrc(video); // Update src to video URL from the card
  console.log('this', video)
  //return src
};

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

  const formatCreatedDate = (createdAt) => {
    const postDate = new Date(createdAt);
    return postDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  //work on getting post to watch page

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
            src={src || mediaUrls}
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen>
         </iframe>
        </VideoWrapper>
        <Title>{title}</Title>
        
        {/* add real author from post and post info */}
        <ChannelName>{caption}</ChannelName>
        <p>{tags}</p>
        <Details>
          <Info>5,938,514 views • {formatCreatedDate(createdAt)}</Info>
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
              <ChannelName onClick={handleCardClick} >{users}</ChannelName>
              <p>{posts.mediaUrls}</p>
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
      <Recommendation>
      
      <Card onClick={() => handleCardClick(posts)}type="sm"/> {src}
        {/* <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/> */}

      </Recommendation>
    </Container>
    </div>
  )  
}

