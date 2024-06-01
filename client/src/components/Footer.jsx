import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SubscriberForm from './SubscriberForm';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // const footerStyle = {
  //   position: 'fixed',
  //   left: 0,
  //   bottom: 0,
  //   width: '100%',
  //   height: '300px', // Adjust the height according to your footer's content
  // };

  return (
  <footer className='py-8 p-2 sm:text-center bg-slate-200 shadow-md' >
    <div className='container grid-cols-1 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2'>
      {/* <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2'> */}

      <div>
        {/* <img src="/img/logo.svg"  alt="logo" className='h-7'/> */}
        <Link to='/'>
          <span className=" text-blue-700 font-bold text-sm sm:text-xl " >MEMWA</span>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap sm:justify-center pb-2'>
            <img src="/img/logo.svg"  alt="logo"/>
            </h1>
            
        </Link> 

        {/* <div className='flex flex-col mt-5'>
            <p>Address: 474829 ksjks test </p>
            <p>Los Angeles, CA</p>
            <p>Email: example@domain.com</p>
            <p>Call: 555-555-5555</p>
        </div> */}
      <h3 level={5} className="font-bold text-blue-700 flex flex-col mt-5 pt-4">Follow Us</h3>
        {/* <div className='flex flex-col gap-4'> */}
        <div className="col-md-5 offset-md-1 mb-3">
            <ul className='flex gap-4 sm:justify-center'>
           <Link to='https://twitter.com/' target="_blank"><li className='p-2' ><FaTwitter className='h-6 w-6' /></li> </Link>
          <Link to='https://www.instagram.com/' target="_blank"><li className='p-2'><FaInstagram className='h-6 w-6'/></li></Link>
          <Link to='https://www.tiktok.com/' target="_blank"><li className='p-2'><FaTiktok className='h-6 w-6'/></li></Link>
          <Link to='https://www.facebook.com/' target="_blank"><li className='p-2'><FaFacebook className='h-6 w-6'/></li></Link>
       </ul>
       </div>

      </div>
      <div>
        <p level={5} className="font-bold text-blue-700">Company</p>
        <div className='flex flex-col sm: '>
          <Link to='/about' className=' sm:inline text-slate-700  hover:underline p-2'>About</Link>
          <Link to='/faq' className=' sm:inline text-slate-700 hover:underline p-2'>FAQ</Link>
          <Link to='/privacy' className='sm:inline text-slate-700 hover:underline p-2'>Privacy</Link>
          <Link to='/support' className='sm:inline text-slate-700 hover:underline p-2'>Support</Link>
          <Link to='/terms' className='sm:inline text-slate-700 hover:underline p-2'>Terms of Service</Link>
        </div>
      </div>

      <div>
        <p level={5} className="font-bold text-blue-700">Pages</p>
        <div className='flex flex-col'>
          <Link to='/'className='sm:inline text-slate-700 hover:underline p-2'>Home</Link>
          <Link to='/capture'className='sm:inline text-slate-700 hover:underline p-2'>Capture</Link>
          <Link to='/watch'className='sm:inline text-slate-700 hover:underline p-2'>Watch</Link>
          <Link to='/search'className='sm:inline text-slate-700 hover:underline p-2'>Find</Link>
        </div>
      </div>

      <div>
        {/* <h3 level={5} className="font-bold text-blue-700">Follow Us</h3> */}
        {/* <div className='flex flex-col gap-4'> */}
        {/* <div className="col-md-5 offset-md-1 mb-3">
            <ul className='flex gap-4 sm:justify-center'>
           <Link to='https://twitter.com/' target="_blank"><li className='p-2' ><FaTwitter className='h-6 w-6' /></li> </Link>
          <Link to='https://www.instagram.com/'><li className='p-2'><FaInstagram className='h-6 w-6'/></li></Link>
          <Link to='https://www.tiktok.com/'><li className='p-2'><FaTiktok className='h-6 w-6'/></li></Link>
          <Link to='https://www.facebook.com/'><li className='p-2'><FaFacebook className='h-6 w-6'/></li></Link>
       </ul>
        </div> */}
        <div className='pb-12'>
            <p level={5} className="font-bold text-blue-700">Subscribe to our newsletter</p>
            <p className='text-left sm:justify-center flex pb-2'>Monthly highlight of new and exciting shared stories.</p>
            <SubscriberForm />    
        </div>

          <div className='text-center justify-center flex pt-6'>
             <p>
            Copyright &copy; 2022-{currentYear}{'  '} 
          
            <Link to="https://pascaledev.com/" target="_blank" rel="noopener noreferrer" className='text-blue-500 underline hover:opacity-95'>
            PascaleDev
            </Link>{'  '} <br></br>
            All rights reserved.
            </p>
          </div>
         
      </div>

    </div>

  </footer>
  )
}
