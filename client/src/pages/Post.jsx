import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import 'swiper/css/bundle';
import {FaShare,} from 'react-icons/fa';
import Contact from '../components/Contact';
import ReactPlayer from 'react-player';

export default function Post() {
    SwiperCore.use([Navigation]);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const params = useParams()
    const {currentUser} = useSelector((state) => state.user); 
    const [author, setAuthor] = useState(null);
    const [users, setUsers] = useState([]);
  
    

    useEffect (() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/get/${params.postId}`);
                const data = await res.json();
                setAuthor(true);
                console.log(data)
              //  console.log(data.mediaUrls[0].includes('.webm' || 'video/mp4')? 'video/webm' : 'image/png')
            
               
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
            }
            setPost(data);
            setLoading(false);
            setError(false);
            } catch (error) {
               setError(true); 
               setLoading(false);
            }
        };
        fetchPost();
    }, [params.postId]);

    const formatCreatedDate = (createdAt) => {
      const postDate = new Date(createdAt);
      return postDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

      //need to create a function that gets the post.userRef and uses that to fetch the user api/user and output the username --> Done

    useEffect(() => {
      // Fetch user data from your database or API and store it in the state
      const fetchUser = async (userId) => {
        try {
          const response = await fetch(`/api/user/${userId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const userData = await response.json();
          setUsers(userData.username);
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

  //++++++delete below
    // useEffect(() => {
    //   // Fetch user data from your database or API and store it in the state
    //   const fetchUsers = async (userId) => {
    //     const response = await fetch(`/api/user/${userId}`);
    //     const userData = await response.json();
    //     setUsers(userData.username);
    //     // setUsers((prevUsers) => ({
    //     //   ...prevUsers,
    //     //   [userId]: userData.username,
    //     // }));
    //     console.log('the', userId, userRef)
    //   };
    //   //fetchUsers(post.userRef);
    //   if (post) {
    //     fetchUsers(post.userRef);
    //   }
    // }, [post, users]);
  //   users.forEach((post) => {
  //     if (!users[post.userRef]) {
  //       fetchUsers(post.userRef);
  //       console.log('the', users)
  //     }
  //   });
  // }, [users]);

    // const getAuthorName = (userRef) => {
    //   //const user = users.find((u) => u.id === userRef);
    //   // const user = fetchUsers(userRef)
    //    console.log(users.username)
    //   return users ? users.username : 'Unknown';
    // };
//+++++delete above
   

  return (
    
    <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        
        {error && <p className='text-red-700 text-center  my-7 text-2xl'>Something went wrong
        <Link to={`/`} className="text-slate-700 p-4 text-sm font-semibold uppercase cursor-pointer hover:opacity-75" >
        <p>Home</p>
        </Link>
        </p> }
        
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
    </main>
  );
}
