import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import { FaCamera, FaMicrophone, FaSearch, FaUpload, FaUsers,  } from 'react-icons/fa';
import 'swiper/css/bundle';
import backgroundImage from '/img/map.png';
import ReactPlayer from 'react-player';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  SwiperCore.use([Navigation]);
  const navigate = useNavigate();
  //console.log(posts)

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/get?order=desc&limit=20`);
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPosts();
  }, []);


  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: "center",
    width: "100%",
    height: "100vh"
};

  return (
    <div>
      {/* Top */}
      {/* <div className='flex flex-col gap-6 p-2 px-3 max-w-6xl mx-auto'> */}
      <div className=' mx-auto text-center gap-6 p-2 px-3 mb-8'>
      <Link className="text-decoration-none" to={"/"}><img className="mx-auto mb-4" src="/img/logo.svg"  alt="Memwa" width="100" height="100" />
      </Link> 
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'> The best way to preserve your <span className='text-blue-700'>stories</span>, your <span className='text-blue-700'>history</span>, your <span className='text-blue-700'>legacy</span>
        </h1>
        <div className='text-slate-400 text-l mx-auto m-4'>
        Memwa is a digital platform to record, watch and search for user stories. Memwa allows users to preserve and share their personal stories, memories, and experiences in a secure public or private space. It aims to provide a seamless and user-friendly experience for capturing, organizing, and sharing meaningful moments.
        <br/>
        Record, watch and search for stories. Search for other user stories based on name, title, location, historical events or profession. Share stories and discover new stories from around the world!
        </div>
        <Link to={'/capture'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
          Let's get started
        </Link>
        
      </div>
      <div className='mx-auto'>
      <h1 className='text-blue-700 font-bold text-2xl lg:text-4xl mx-auto text-center'><Link to={'/capture'}>Memwa CAPTURE</Link></h1>
      <h2 className='text-gray-400 text-l text-center mx-auto'>Record or upload moments to Memwa. Add videos, pictures or other media. Don't have any yet, go to the Interview Room and respond to curated questions to capture your story.</h2>
      
      <div className="max-w-6xl mx-auto p-3 flex justify-center gap-8 my-10 items-center"> 
        <Link className='text-2xl font-semibold text-slate-600 hover:underline flex flex-wrap gap-2' to={`/capture`}>
        <FaCamera />Record
        </Link>
        {/* <Link className='text-2xl font-semibold text-slate-600 hover:underline flex flex-wrap gap-2' to={`/capture`}>
        <FaUpload />Upload 
        </Link> */}
        <Link className='text-2xl font-semibold text-slate-600 hover:underline flex flex-wrap gap-2' to={`/interview-room`}>
        <FaMicrophone />Interview Room 
        </Link>
      </div>

      </div>
      
      {/* Swiper */}
      <div className=' mx-auto text-center'> 
      <h1 className='text-blue-700 font-bold text-2xl lg:text-4xl mx-auto text-center'><Link to={'/watch'}>Memwa WATCH</Link></h1>
      <h2 className='text-gray-400 text-l text-center mx-auto'>Watch stories from everywhere!</h2>
      <Swiper navigation>
        {posts &&
          posts.length > 0 &&
          posts.map((post) => (
            <SwiperSlide key={post._id}>
              <Link to={`/post/${post._id}`}>
              <p className='text-2xl font-semibold mx-auto pl-10 text-blue-700 text-left'>
              {post.title}</p></Link>
              {post.mediaUrls[0].includes('.webm' || 'video/mp4') ? (
                <div className="h-[550px]">
                <ReactPlayer
                  url={post.mediaUrls[0]}
                  controls
                  width="100%"
                  height="100%"
                />
                </div>

              ) : (  
              <div
                style={{
                  background: `url(${post.mediaUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                
              ></div>
              )}
              
            </SwiperSlide>
          ))}
      </Swiper>
      <Link className='text-xl text-blue-800 hover:underline' to={`/watch`}>
        Watch more moments 
      </Link>
      </div>
      
      {/* Find */}
      
      <div className='mx-auto pt-10' style={containerStyle} >
      <h1 className='text-blue-700 font-bold text-2xl lg:text-4xl mx-auto text-center pt-12a'><Link to={'/search'}>Memwa FIND</Link></h1>
      <h2 className='text-gray-400  sm:text-sm text-xl  lg:text-2xl text-center mx-auto'>Discover more Stories</h2>
        {
          posts && posts.length > 0 && (
            <div className='text-center mx-auto'>
              <div className='my-3'>
                <h2 className='text-l font-semibold text-slate-600'>Browse and Discover new stories!</h2>

                <form  onSubmit={handleSubmit} className='flex-2 flex-col gap-2'>
                  <div className='flex items-center gap-2 p-4'>
                      <label className='whitespace-nowrap font-semibold'></label>
                      <input
                      type='text'
                      id='searchTerm'
                      placeholder='Search...'
                      className='border rounded-lg p-3 w-full'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hove:opacity-95'>Search</button>
                  </div>
                  {/* <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hove:opacity-95'>Search</button> */}
                </form>

                {/* <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
                  <input type="search" placeholder="Search...." aria-label="Search" name="searchTerm" className='bg-transparent focus:outline-none rounded-lg p-3 w-full'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button>
                  <FaSearch className='text-slate-600' />
                  </button>
                </form> */}


                  <p className='text-gray-400 text-l text-center mx-auto p-3'>Search for people, stories, events from around the world. New stories are being added everyday.
                  Browse through <b><span style={{ color: '#3563E9' }}>2,100</span></b> stories from <b><span style={{ color: '#3563E9' }}>68</span></b> countries</p>
                <Link className='text-xl text-blue-800 hover:underline' to={`/search?order=desc`}>
                Find more moments 
                {/* <FaSearch /> */}
                </Link>
                
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}


