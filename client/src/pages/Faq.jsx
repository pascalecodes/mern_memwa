import { Link } from 'react-router-dom';


const styles = {
  list: {
    listStyleType: 'disc', // Adjust for different bullet styles (circle, square, etc.)
    padding: '0',
    margin: '0',

  },
  listItem: {
    marginBottom: '5px', // Adjust spacing as needed
    marginLeft: '30px',
  },
};

export default function Faq() {
  return (
      <div className='py-20 px-8 max-w-6xl mx-auto min-h-[20vh]'>
      <h1 className='text-5xl font-bold mb-4 text-blue-600 text-center' >Memwa FAQ</h1>
      <div className="container px-4 py-5 my-5">
        <h2 className='text-2xl text-blue-700 mt-4'>What is Memwa?</h2>
        <p>Memwa is a digital platform to record, watch and search for user stories. Memwa allows users to preserve and share their personal stories, memories, and experiences in a secure and public or private space. It aims to provide a seamless and user-friendly experience for capturing, organizing, and sharing meaningful moments.
        </p>
        <h2 className='text-2xl text-blue-700 mt-4'>How does Memwa work?</h2>
        <p>Users can login to their profile to record, edit or delete video memories. Users can search for other user stories based on common criteria like location, historical events or profession.</p>
        <p>Memwa currently has many features, which include:</p>
        <ul style={styles.list}>
          <li style={styles.listItem}>create an account</li>
          <li style={styles.listItem}>add image avatar to profile</li>
          <li style={styles.listItem}>edit profile options</li>
          <li style={styles.listItem}>upload media files</li>
          <li style={styles.listItem}>record a video</li>
          <li style={styles.listItem}>respond to questions from database</li>
          <li style={styles.listItem}>download your recorded video locally</li>
          <li style={styles.listItem}>search for videos in database</li>
          <li style={styles.listItem}>watch videos from others</li>
          <li style={styles.listItem}>comment and like video</li>
  
        </ul>
        <h2 className='text-2xl text-blue-700 mt-4'>What languages are available on Memwa?</h2>
        <p>You can capture in any languague you choose however the navigation of the application is currently only localized in a few languages. Memwa currently supports the following languages:</p>
        <ul style={styles.list}>
          <li style={styles.listItem}>English</li>
          <li style={styles.listItem}>Spanish*</li>
          <li style={styles.listItem}>Haitian Creole*</li>
          <li style={styles.listItem}>Yoruba*</li>
          <li style={styles.listItem}>Japanese*</li>

          <p>*coming soon</p>
        </ul>
        <h2 className='text-2xl text-blue-700 mt-4'>How much does Memwa cost?</h2>
        <p>Memwa is currently free to use for shorter video recordings. However, there will be premium plans that offers additional storage capacity and features for sharing, editing and expanding the historical linkages of the stories captured. The goal is to keep these plans as low as possible while still allowing us to cover the infrastructure costs of keeping the platform up and running.</p>
        <h2 className='text-2xl text-blue-700 mt-4'>How do I sign up for Memwa?</h2>
        <p>You can sign up for Memwa by visiting our website at www.memwa.app.</p>
        <h2 className='text-2xl text-blue-700 mt-4'>How to Create a Post</h2>
        <p>To create a post, simply follow these steps:</p>
        <ul style={styles.list}>
          <li style={styles.listItem}>Click on the "Start" button from the capture page or upload media content from capture or profile page.</li>
          <li style={styles.listItem}>Give your post a title.</li>
          <li style={styles.listItem}>Add a photo or video to your post.</li>
          <li style={styles.listItem}>Write a description of your post.</li>
          <li style={styles.listItem}>Click on the "Submit" button.</li>
        </ul>
        <p>Your  post will then be saved to your profile. If you record a video you can also download it locally before you submit to our database.</p>
        <h2 className='text-2xl text-blue-700 mt-4'>What Can I Include in My  Post?</h2>
        <p>You can include anything you want in your post, such as:</p>
        <ul style={styles.list}>
          <li style={styles.listItem}>Photos</li>
          <li style={styles.listItem}>Videos</li>
          <li style={styles.listItem}>Text</li>
          <li style={styles.listItem}>Audio</li>
   
        </ul>

        <h2 className='text-2xl text-blue-700 mt-4'>How to Share Your Post</h2>
        <p>Once you have published your post, you can share it with your friends and family by:</p>
        <ul style={styles.list}>
          <li style={styles.listItem}>Sending a link to the post.</li>
          <li style={styles.listItem}>Sharing the post on social media.</li>
          <li style={styles.listItem}>Copying and pasting the text of the post into an email or message.</li>
        </ul>
        <h2 className='text-2xl text-blue-700 mt-4'>How Can You Contact Us?</h2>
        <p className='mb-4 text-slate-700'>If you have any questions about this Policy, please contact us at<span> </span>  
        <Link 
              to={`mailto:info@memwa.app?subject=Question on Policies Memwa app`}
              className='text-blue-500 hover:opacity-95'>
                info@memwa.app
        </Link> 
        </p>
        <h2 className='text-2xl text-blue-700 mt-4'>Suggestions or Feature requests?</h2>
        <p className='mb-4 text-slate-700'>If you have any suggestions on how we can improve or features you would like us to add, feel free to email us!<span> </span>  
        <Link 
              to={`mailto:info@memwa.app?subject=Question on Policies Memwa app`}
              className='text-blue-500 hover:opacity-95'>
                wish@memwa.app
        </Link> 
        </p>
    </div>
    </div>
  )
}
