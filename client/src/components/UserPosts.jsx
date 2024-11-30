import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
   height: 1000px; // Set the desired height for the recommendation section
  overflow-y: scroll; // Enable vertical scrolling
`;

// const UserPosts = ({ channel }) => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       const res = await axios.get(`/api/post/tags?tags=${tags}`);
//       setVideos(res.data);
//     };
//     fetchVideos();
//   }, [tags]);
const UserPosts = ({ post }) => {
  const [videos, setVideos] = useState([]);

  console.log(post)
  useEffect(() => {
    const fetchVideos = async () => {
      //const res = await axios.get(`/api/post/tags?tags=${tags}`);
      const res = await axios.get(`/api/post/user/${post}`)
      setVideos(res.data);
      console.log(res)
    };
    fetchVideos();
  }, [post]);

  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
  
      {/* {videos.map(video => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.caption}</p>
            <div>
              <strong>Tags:</strong>
              <ul>
                {post.tags.map((tag, index) => (
                  <li key={index}>{tag}</li>
                ))} */}
    </Container>
  );
};

export default UserPosts;