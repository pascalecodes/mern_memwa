import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

export default function Contact({post}) {
    const [author, setAuthor] = useState(null);
    const [message, setMessage] = useState("")
    const onChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        const fetchAuthor = async () => {
           try {
            const res = await fetch(`/api/user/${post.userRef}`);
            const data = await res.json();
            setAuthor(data);
           } catch (error) {
            console.log(error);
           }
        }
        fetchAuthor();

    }, [post.userRef])
  return (
    <>
      {author && (
        <div className='flex flex-col gap-2'>
           <p>Contact <span className='font-semibold'>{author.username}</span>{' '} for{' '}<span className='font-semibold'>{post.title.toLowerCase()}</span></p> 
           <textarea 
            name="message" 
            id="message" 
            row="4" 
            value={message} 
            onChange={onChange}
            placeholder='Enter your message here.....'
            className='w-full border p-3 rounded-lg'
            ></textarea>

            <Link 
            to={`mailto:${author.email}?subject=Regarding your story titled ${post.name}&body=${message}`}
            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'>
                Send Message
            </Link> 
        </div>
      )}
    </>
  );
}
