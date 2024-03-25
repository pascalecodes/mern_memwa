import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
              <img src="imgs/logo.svg" alt="#"/>
          <span className="text-slate-500" >MEMWA</span>
        </h1>
        </Link>
      <ul className='flex gap-4'>
        <Link to='/'><li className='hidden sm:inline text-slate-700 hover:underline'>Home</li> </Link>
        <Link to='/capture'><li className='hidden sm:inline text-slate-700 hover:underline'>Capture</li></Link>
        <Link to='/watch'><li className='hidden sm:inline text-slate-700 hover:underline'>Watch</li></Link>
        <Link to='/find'><li className='hidden sm:inline text-slate-700 hover:underline'>Find</li></Link>
      </ul>
     <form className='bg-slate-100 p-3 rounded-lg flex items-center'  action="/find" method="GET">
      <input type="search" placeholder="Search...." aria-label="Search" name="searchTerm" className='bg-transparent focus:outline-none w-24 sm:w-64'/>
     <FaSearch className='text-slate-600' />
     </form>
     <ul className='flex gap-2'>
      <Link to='/sign-in'><li className='sm:inline text-slate-700 hover:underline'>Sign In</li></Link>
      <Link to='/sign-up'><li className='hidden sm:inline text-slate-700 hover:underline'>Sign Up</li></Link>
     </ul>
    </div>
    
    </header>
  )
}

export default Header
