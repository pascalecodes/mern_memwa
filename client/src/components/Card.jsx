import axios from "axios";
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import {format} from 'timeago.js';


const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;


////***************Testing */
// const Card = ({type}) => {
//   const [posts, setPosts] = useState([]);
//   // const [src, setSrc] = useState(''); // State for src
//   // const [videoId, setVideoId] = useState('')

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await fetch(`/api/post/get?order=desc`);
//         const data = await res.json();
//         //const res = await axios.get(`/api/posts`);
//         //const data = await res.json();
//         //console.log(data)
//         //setPosts(res.data);
//         setPosts(data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchPost();
//   }, []);
////****************above */

  // const showVid = async (i) => {
  //   //const video= "this is placeholder"
  //   //const video = posts[i].mediaUrls[0]
  //   const video = posts[i].mediaUrls[0]
  //   setSrc(video); // Update src to video URL from the card
  //   // setVideoId(posts[i]._id)
  //   // console.log(video, vide)
  //   //return video
  //   //console.log(`play video: ${video}`)
  // }

  //const videoUrl= video
  // const { currentVideo, relatedVideos } = posts;
  // console.log(currentVideo)
  // if (post.length === 0) {
  //   return <div>Loading...</div>;
  // }

  // const calculateDaysSinceCreation = (createdAt) => {
  //   const postDate = new Date(createdAt);
  //   const currentDate = new Date();
  //   const timeDiff = Math.abs(currentDate.getTime() - postDate.getTime());
  //   const daysSinceCreation = Math.ceil(timeDiff / (1000 * 3600 * 24));
  //   return daysSinceCreation;
  // };
  // const { mediaUrls, title } = posts[1];
//*****************************testing */
//   return (
//     //<Link to=`/post/${post._id}` style={{textDecoration:"none"}}> 
//     //<Link to={`/post/${post._id}`} style={{textDecoration:"none"}}> 
//     <>
//       {posts.map((post, index) => (
//         // <Link key={index} to={post.mediaUrls} style={{ textDecoration: 'none' }}>
//         <Link key={index} to={`/post/${post._id}`} style={{textDecoration:"none"}}> 
//      {/* <Link to={mediaUrls} style={{textDecoration:"none"}}>  */}

    
//     <Container type={type}>
//        <Image
//           type={type}
//           src={"https://content.wepik.com/statics/9411920/preview-page0.jpg"}
//         />
      
//       <Details type={type}>
//         <ChannelImage 
//         type={type}
//         src={"https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"}/>
//         <Texts>
//           <Title>{post.title}</Title>
//           <ChannelName>{post.caption}</ChannelName>
//           <p className='text-blue-700'>{post.tags}</p>
//           <Info>660,908 views • {format(post.createdAt)}</Info>
//         </Texts>
//       </Details>
//     </Container>
//     </Link>
//   ))}
//     </>
//   );
// };
// export default Card

// ***** NEW test
const Card = ({type, video}) => {
  const [channel, setChannel] = useState({});
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      //const res = await axios.get(`/api/users/find/${video.uerRef}`);
      const res = await axios.get(`/api/post/user/${video.userRef}`);
      const getAuthorName = await axios.get(`/api/user/find/${video.userRef}`)
      //const res = await axios.get(`/videos/${type}`);
      setChannel(res.data);
      //console.log(channel)
      setAuthor('author', getAuthorName.data.username)
    }
    fetchChannel();
  }, []); 

  return (
    <Link to={`/post/${video._id}`} style={{textDecoration:"none"}}> 
    <Container type={type}>
       <Image
          type={type}
          // src={video.mediaUrls}
          src={"https://content.wepik.com/statics/9411920/preview-page0.jpg"}
        />
      <Details type={type}>
        <ChannelImage 
        type={type}
        // src={channel.img}
        src={"https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"}/>
        <Texts>
          <Title>{video.title}</Title>
          <ChannelName>{author._id} </ChannelName>
          <p className='text-blue-700'>{video.tags}</p>
          <Info>660,908 views • {video.likes} likes • {format(video.createdAt)}</Info>
        </Texts>
      </Details>
    </Container>
    </Link>
  );
};

export default Card





  

