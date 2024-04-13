import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import { FaCamera, FaMicrophone, FaSearch, FaUpload, FaUsers,  } from 'react-icons/fa';
import 'swiper/css/bundle';

export default function Home() {
  const [posts, setPosts] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(posts)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/get?order=desc&limit=4`);
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div>
      {/* Top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'> 
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'> The best way to preserve your <span className='text-slate-400'>stories</span>, your <span className='text-slate-400'>history</span>, your <span className='text-slate-400'>legacy</span>
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
        Memwa is a digital platform to record, watch and search for user stories. Memwa allows users to preserve and share their personal stories, memories, and experiences in a secure and public or private space. It aims to provide a seamless and user-friendly experience for capturing, organizing, and sharing meaningful moments.
        <br />
        Record, watch and search for stories. Search for other user stories based on name, title, location, historical events or profession. Share stories and discover new stories from around the world!
        </div>
        <Link to={'/capture'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
          Let's get started
        </Link>
        
      </div>
      <h1 className='text-blue-700 font-bold text-2xl lg:text-4xl mx-auto text-center'>Memwa CAPTURE</h1>
      <div className='max-w-6xl mx-auto p-3 flex  gap-8 my-10 text-center'> 
        <Link className='text-2xl font-semibold text-slate-600 hover:underline flex flex-wrap gap-2' to={`/capture`}>
        <FaCamera />Record
        </Link>
        <Link className='text-2xl font-semibold text-slate-600 hover:underline flex flex-wrap gap-2' to={`/capture`}>
        <FaUpload />Upload 
        </Link>
        <Link className='text-2xl font-semibold text-slate-600 hover:underline flex flex-wrap gap-2' to={`/capture`}>
        <FaMicrophone />Interview Room 
        </Link>
      </div>
      {/* Swiper */}
      <div className=' mx-auto'> 
      <h1 className='text-blue-700 font-bold text-2xl lg:text-4xl mx-auto text-center'>Memwa WATCH</h1>
      <Swiper navigation>
        {posts &&
          posts.length > 0 &&
          posts.map((post) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${post.mediaUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={post._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      </div>
      
      {/* Find */}
      <h1 className='text-blue-700 font-bold text-2xl lg:text-4xl mx-auto text-center'>Memwa FIND</h1>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          posts && posts.length > 0 && (
            <div className=''>
              <div className='my-3'>
                <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Discover more Stories</h1>
                <h2 className='text-1xl font-semibold text-slate-600'>Browse and Discover new stories!</h2>
                  <p className="">Search for people, stories, events from around the world. New stories are being added everyday.</p>
                <Link className='text-xl text-blue-800 hover:underline' to={`/search?order=desc`}>
                Show more Moments 
                {/* <FaSearch /> */}
                </Link>
                <p>Browse through <b><span style={{ color: '#3563E9' }}>2,100</span></b> stories from <b><span style={{ color: '#3563E9' }}>68</span></b> countries</p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}


