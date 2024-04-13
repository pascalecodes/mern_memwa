import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-slate-200 shadow-md flex flex-col mx-auto'>
      <div className="container mx-auto flex justify-center items-center">
        <div className="row">
        <div className="col mb-3">
            <a href="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
            <img className="bi me-2"  width="80" height="80" src="/imgs/logo.svg" alt="MEMWA "/>
            </a>
          </div>
  
        <div className="flex col-6 col-md-2 mb-3">
          <h5 >Company</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">About</li>
            <li className="nav-item mb-2">FAQ</li>
            <li className="nav-item mb-2">Privacy</li>
            <li className="nav-item mb-2">Support</li>
            <li className="nav-item mb-2">Terms of Service</li>
          </ul>
        </div>
  
        <div className=" flex col-6 col-md-2 mb-3">
          <h5>Pages</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">Home</li>
            <li className="nav-item mb-2">Capture</li>
            <li className="nav-item mb-2">Watch</li>
            <li className="nav-item mb-2"></li>
          </ul>
        </div>
  
        <div className="col-md-5 offset-md-1 mb-3">
          {/* <form className=''>
            <h5>Subscribe to our newsletter</h5>
            <p>Monthly highlight of new and exciting shared stories.</p>
            <div class="d-flex flex-column flex-sm-row w-100 gap-2">
              <label for="newsletter1" class="visually-hidden">Email address</label>
              <input id="newsletter1" type="email" name="email" class="form-control" placeholder="Email address">
              <br>
              <button class="btn btn-primary" type="submit">Subscribe</button>
            </div>
          </form> */}
          <p id="message"></p>
        </div>
      </div>
      </div>
     
    </footer>
  )
}
