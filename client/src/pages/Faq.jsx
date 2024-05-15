import { Link } from 'react-router-dom';

export default function Faq() {
  return (
      <div className='py-20 px-8 max-w-6xl mx-auto min-h-[20vh]'>
      <h1 className='text-5xl font-bold mb-4 text-blue-600 text-center' >Memwa FAQ</h1>
      <div className="container px-4 py-5 my-5">
        <h2 className='text-2xl text-slate-700'>What is Memwa?</h2>
        <p>Memwa is a digital platform to record, watch and search for user stories. Memwa allows users to preserve and share their personal stories, memories, and experiences in a secure and public or private space. It aims to provide a seamless and user-friendly experience for capturing, organizing, and sharing meaningful moments.</p>
        <h2 className='text-2xl text-slate-700 mt-2'>How does Memwa work?</h2>
        <p>Users can login to their profile to record, edit or delete video memories. Users can search for other user stories based on common criteria like location, historical events or profession.</p>
        <p>Memwa currently has many features, which include:</p>
        <ul>
          <li>create an account</li>
          <li>add image avatar to profile</li>
          <li>edit profile options</li>
          <li>upload media files</li>
          <li>record a video</li>
          <li>respond to questions from database</li>
          <li>download your recorded video locally</li>
          <li>search for videos in database</li>
          <li>watch videos from others</li>
          <li>comment and like video</li>
  
        </ul>
        <h2 className='text-2xl text-slate-700 mt-2'>What languages are available on Memwa?</h2>
        <p>You can capture in any languague you choose however the navigation of the application is currently only localized in a few languages. Memwa currently supports the following languages:</p>
        <ul>
          <li>English</li>
          <li>Spanish*</li>
          <li>Haitian Creole*</li>
          <li>Yoruba*</li>
          <li>Japanese*</li>

          <p>*coming soon</p>
        </ul>
        <h2 className='text-2xl text-slate-700 mt-2'>How much does Memwa cost?</h2>
        <p>Memwa is currently free to use for shorter video recordings. However, there will be premium plans that offers additional storage capacity and features for sharing, editing and expanding the historical linkages of the stories captured. The goal is to keep these plans as low as possible while still allowing us to cover the infrastructure costs of keeping the platform up and running.</p>
        <h2 className='text-2xl text-slate-700 mt-2'>How do I sign up for Memwa?</h2>
        <p>You can sign up for Memwa by visiting our website at www.memwa.app.</p>
        <h2 className='text-2xl text-slate-700 mt-2'>How to Create a Post</h2>
        <p>To create a post, simply follow these steps:</p>
        <ol>
          <li>Click on the "Start" button from the capture page or upload media content from capture or profile page.</li>
          <li>Give your post a title.</li>
          <li>Add a photo or video to your post.</li>
          <li>Write a description of your post.</li>
          <li>Click on the "Submit" button.</li>
        </ol>
        <p>Your  post will then be saved to your profile. If you record a video you can also download it locally before you submit to our database.</p>
        <h2 className='text-2xl text-slate-700 mt-2'>What Can I Include in My  Post?</h2>
        <p>You can include anything you want in your post, such as:</p>
        <ul>
          <li>Photos</li>
          <li>Videos</li>
          <li>Text</li>
          <li>Audio</li>
   
        </ul>

        <h2 className='text-2xl text-slate-700 mt-2'>How to Share Your Post</h2>
        <p>Once you have published your post, you can share it with your friends and family by:</p>
        <ul>
          <li>Sending a link to the post.</li>
          <li>Sharing the post on social media.</li>
          <li>Copying and pasting the text of the post into an email or message.</li>
        </ul>
        <h2 className='text-2xl text-slate-700 mt-2'>How Can You Contact Us?</h2>
        <p className='mb-4 text-slate-700'>If you have any questions about this Policy, please contact us at<span> </span>  
        <Link 
              to={`mailto:info@memwa.app?subject=Question on Policies Memwa app`}
              className='text-blue-500 underline hover:opacity-95'>
                info@memwa.app
        </Link> 
        </p>
    </div>
    </div>
  )
}
