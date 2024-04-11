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

export default function Post() {
    SwiperCore.use([Navigation]);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const params = useParams()
    const {currentUser} = useSelector((state) => state.user);   

    useEffect (() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/get/${params.postId}`);
                const data = await res.json();
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
          <Swiper navigation>
            {post.mediaUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'contain',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
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

          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {post.title} 
            </p>
            {/* <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {post.location}
            </p> */}
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Caption - </span>
              {post.caption}
            </p>
    
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {post.description}
            </p>
            {/* <ul className=' text-blue-500 font-semibold text-sm'>
                <li className='flex items-center gap-1 whitespace-nowrap'>
                    {post.tags}
                </li>
            </ul> */}
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
                >Contact Author</button>
            )}
            
            {contact && <Contact post={post} /> }


          </div>
        

        </div>
        )}
    </main>
  );
}
