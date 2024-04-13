import { Link } from "react-router-dom"
import {useEffect, useState} from 'react'
import { MdPerson } from 'react-icons/md';

export default function PostItem({post}) {
    const [author, setAuthor] = useState(null);
    
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
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/post/${post._id}`}>
        <img 
        src={post.mediaUrls[0] || "https://i.pinimg.com/originals/4e/08/f5/4e08f596f8fc6eb3c1eee8295b40bae4.jpg"} 
        alt='post cover' 
        className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'/>
        <div className="p-3 flex flex-col gap-2 w-full">
            <p className="truncate text-lg font-semibold text-slate-700 ">{post.title}</p>
           
            <div className="flex items-center gap-1">
                <MdPerson className="text-blue-500 text-xl" />
                <span className='text-blue-500 text-sm'>{author && ( <p>{author.username}</p>)}</span>
            </div>
            <p className="text-sm text-gray-600">{post.caption}</p>
            <p className="text-sm text-gray-600 line-clamp-2">{post.description}</p>
        </div>
      </Link>

    </div>
  )
}
