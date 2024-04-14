import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-slate-200 shadow-md flex flex-col mx-auto'>
    
        <div className="p-2"> 
          <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <img src="/img/logo.svg"  alt="logo"/>
            <span className=" text-blue-500" >MEMWA</span>
          </h1>
          </Link> 
          <div className="col-md-5 offset-md-1 mb-3">
            <h3 className="font-bold text-blue-700">Follow on Social</h3>
            <ul className='flex gap-4'>
            <Link to='https://twitter.com/' target="_blank"><li className='p-2' ><FaTwitter className='h-6 w-6' /></li> </Link>
            <Link to='https://www.instagram.com/'><li className='p-2'><FaInstagram className='h-6 w-6'/></li></Link>
            <Link to='https://www.tiktok.com/'><li className='p-2'><FaTiktok className='h-6 w-6'/></li></Link>
            <Link to='https://www.facebook.com/'><li className='p-2'><FaFacebook className='h-6 w-6'/></li></Link>
            </ul>
            <p>
              Copyright &copy; 2022-{currentYear}{'  '}
              <Link to="https://pascaledev.com/" target="_blank" rel="noopener noreferrer" className='text-blue-500 underline hover:opacity-95'>
              PascaleDev
              </Link>{'  '}
              All rights reserved.
            </p>
          </div>
        </div>
  
        <div className="flex col-6 col-md-2 mb-3">
          <h3 className='font-bold text-blue-700'>Company </h3>
          <ul className='flex gap-4'>
            <Link to='/about'><li className='hidden sm:inline text-slate-700 hover:underline p-2'>About</li> </Link>
            <Link to='/faq'><li className='hidden sm:inline text-slate-700 hover:underline p-2'>FAQ</li></Link>
            <Link to='/privacy'><li className='hidden sm:inline text-slate-700 hover:underline p-2'>Privacy</li></Link>
            <Link to='/support'><li className='hidden sm:inline text-slate-700 hover:underline p-2'>Support</li></Link>
            <Link to='/terms'><li className='hidden sm:inline text-slate-700 hover:underline p-2'>Terms of Service</li></Link>
          </ul>
        </div>
  
        <div className=" flex col-6 col-md-2 mb-3">
          <h3 className='font-bold text-blue-700'>Pages</h3>
          <ul className='flex gap-4'>
            <Link to='/'><li className='hidden sm:inline text-slate-700 hover:underline p-2'>Home</li> </Link>
            <Link to='/capture'><li className='hidden sm:inline text-slate-700 hover:underline p-2'>Capture</li></Link>
            <Link to='/watch'><li className='hidden sm:inline text-slate-700 hover:underline p-2'>Watch</li></Link>
            <Link to='/Search'><li className='hidden sm:inline text-slate-700 hover:underline p-2'>Find</li></Link>
          </ul>
        </div>
  
        <div className="col-md-5 offset-md-1 mb-3">
          <h3 className="font-bold text-blue-700">Subscribe to our newsletter</h3>
          <p>Monthly highlight of new and exciting shared stories.</p>
          <form>
            <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
            <input id="newsletter1" type="email" name="email" className="form-control" placeholder="Email address" />
            <br />
            <button className="btn btn-primary" type="submit">Subscribe</button>
            <p id="message"></p>
          </form>
        </div>

    </footer>
  )
}
