import {FaSearch} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

export default function Header () {
  const {currentUser} = useSelector(state => state.user)
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
              <img src="/img/logo.svg"  alt="logo"/>
          <span className=" text-blue-500" >MEMWA</span>
        </h1>
        </Link>
      <ul className='flex gap-4'>
        <Link to='/'><li className='hidden sm:inline text-slate-700 hover:underline'>Home</li> </Link>
        <Link to='/capture'><li className='hidden sm:inline text-slate-700 hover:underline'>Capture</li></Link>
        <Link to='/watch'><li className='hidden sm:inline text-slate-700 hover:underline'>Watch</li></Link>
        <Link to='/Search'><li className='hidden sm:inline text-slate-700 hover:underline'>Find</li></Link>
      </ul>
    
    

     <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
      <input type="search" placeholder="Search...." aria-label="Search" name="searchTerm" className='bg-transparent focus:outline-none w-24 sm:w-64'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      
      />
      <button>

      <FaSearch className='text-slate-600' />
      </button>
     </form>

     <ul className='flex gap-2'>
      <Link to='/profile'>
        {currentUser ? (
         <li className='hidden sm:inline text-slate-700 hover:underline'><img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' /> Profile</li> 
        ) : ( <li className='sm:inline text-slate-700 hover:underline'>Sign In</li>)} 
        </Link>
        <Link to={'/about'} className='hidden sm:inline text-slate-700 hover:underline'>About</Link>
      {/* <Link to='/sign-up'><li className='hidden sm:inline text-slate-700 hover:underline'>Sign Up</li></Link> */}
     </ul>
    </div>
    
    </header>
  );
}

