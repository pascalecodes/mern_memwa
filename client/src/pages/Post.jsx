import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const params = useParams()

    useEffect (() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/get/${params.postId}s`);
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
            }
            setPost(data);
            setLoading(false);
            } catch (error) {
               setError(true); 
               setLoading(false);
            }
        };
        fetchPost();
    }, [params.postId]);
  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && <p className='text-red-700 text-center  my-7 text-2xl'>Something went wrong
        <Link to={`/`} className="text-slate-700 p-4 text-sm font-semibold uppercase cursor-pointer hover:opacity-75" >
        <p>Home</p>
        </Link>
        </p> }
        
    </main>
  )
}
