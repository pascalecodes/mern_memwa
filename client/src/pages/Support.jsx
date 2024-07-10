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

export default function Support() {
  return (
    <div className='py-20 px-8 max-w-6xl mx-auto min-h-[20vh]'>
      <h1 className='text-5xl font-bold mb-4 text-blue-600 text-center' >Memwa Support</h1>
      <div className="container px-4 py-5 my-5">
        <h2 className='text-2xl text-blue-700 mt-4'>Welcome to the Memwa Support website!</h2>
        <p className='w-full'>This website is here to help you with using Memwa or with problems you may encounter.</p>
        <p className='w-full'>You can find answers to frequently asked questions in our <span> </span> 
        <Link 
              to={`/faq`}
              className='text-blue-500 hover:opacity-95'>
                FAQ
        </Link> section.</p>
        <p>If you can't find the answer to your question, you can contact us using the form below.</p>
        <div className='flex flex-col md:flex-row justify-between'>
        <div className='md:w-1/2'>
        <form action="/hc/en-us/contact" method="post" className="form-row">
          <input className=" flex h-10 w-full mb-2" type="text" name="name" placeholder="Your name"/>
          <input className=" flex h-10 w-full  mb-2" type="email" name="email" placeholder="Your email address"/>
          <input className=" flex  h-10 w-full mb-2" type="text" name="subject" placeholder="Subject"/>
          <textarea className=" flex h-20 w-full  mb-2" name="message" placeholder="Your message"></textarea>
          {/* <input className=" flex w-full m-2" type="submit" value="Submit"/> */}
          <button className=' flex w-full mb-2 bg-slate-700 text-white p-1 rounded-lg uppercase hove:opacity-95' type="submit" value="Upload">Submit</button>
        </form>
        </div>
        </div>
      
      <h2 className='text-2xl text-blue-700 pt-4 mt-4'>Tips for Creating a Great Post</h2>
      <p>Here are a few tips for creating a great post:</p>
      <ul style={styles.list}>
        <li style={styles.listItem}>Make sure your title is memorable and descriptive.</li>
        <li style={styles.listItem}>Use high-quality photos or videos whenever possible.</li>
        <li style={styles.listItem}>Add captions and tags to help grouping</li>
        <li style={styles.listItem}>Adding more details, pictures and other supporting documents brings you story to life</li>
        <li style={styles.listItem}>Write a clear and concise description for each post.</li>
        <li style={styles.listItem}>Add location information to your post, if possible.</li>
        <li style={styles.listItem}>Share your  post on social media and with your friends and family.</li>
      </ul>
      <p className='pt-2'>We hope this helps!</p>
    </div>
    </div>
  )
}
