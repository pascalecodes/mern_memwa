import {FaSearch} from 'react-icons/fa'

function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
          <a href="/" >
              <img src="imgs/logo.svg" alt="#"/>
          </a>
          <span className="text-slate-500" >MEMWA</span>
        </h1>
      <ul className='flex items-center'>
          <li><a href="/" >Home</a></li>
          <li><a href="/capture" >Capture</a></li>
          <li><a href="/watch" >Watch</a></li>
          <li><a href="/find" >Find</a></li>
      </ul>
     <form className='bg-slate-100 p-3 rounded-lg flex items-center'  action="/find" method="GET">
      <input type="search" placeholder="Search...." aria-label="Search" name="searchTerm" className='bg-transparent border focus:outline-none w-24 sm:w-64'/>
     <FaSearch className='text-slate-600' />
     </form>
     <a href="/login" type="button" class="btn btn-outline-light me-2">Login</a>
    <a href="/signup" type="button" class="btn btn-warning">Sign-up</a>
    </div>
    
    </header>
  )
}

export default Header
