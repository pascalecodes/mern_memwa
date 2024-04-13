import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PostItem from '../components/PostItem';

export default function Search() {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        sort: 'created_at',
        order: 'desc',
    });

    const [loading, setLoading] =useState(false);
    const [posts, setPosts] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if(
            searchTermFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ){
           setSidebardata({
            searchTerm: searchTermFromUrl || '',
            sort: sortFromUrl || 'created_at',
            order: orderFromUrl || 'desc',
           }); 
        }

        const fetchPosts = async () => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/get?${searchQuery}`);
            const data = await res.json();
            if(data.length >8){
                setShowMore(true)
            } else {
                setShowMore(false)
            }
            setPosts(data);
            setLoading(false);
        }

        fetchPosts();

    }, [location.search]);
    

    const handleChange = (e) =>{
    // if(e.target.id === 'all'|| e.target.id === 'title' || e.target.id === 'description'|| e.target.id === 'tags'|| e.target.id === 'author') {
    //     setSidebardata({...sidebardata, include: e.target.id})
    // }
    
    if (e.target.id === 'searchTerm') {
        setSidebardata({ ...sidebardata, searchTerm: e.target.value });
      }

    // if(e.target.id === 'video' || 'pictures' || 'other'){
    //     setSidebardata({...sidebardata, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false, });
    // }
    
    if (e.target.id === 'sort_order') {
        const sort = e.target.value.split('_')[0] || 'created_at';
  
        const order = e.target.value.split('_')[1] || 'desc';
  
        setSidebardata({ ...sidebardata, sort, order });
      }

    };

    const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    };

    const onShowMoreClick = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/get?${searchQuery}`);
        const data = await res.json();
        if (data.length < 9) {
            setShowMore(false);
        }
        setPosts([...posts, ...data]);

    };

    return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                 <input
                type='text'
                id='searchTerm'
                placeholder='Search...'
                className='border rounded-lg p-3 w-full'
                value={sidebardata.searchTerm}
                onChange={handleChange}
                />
            </div>
            {/* these are not functional yet */}
            {/* <div className='flex gap-2 flex-wrap items-center'>
                <label className='font-semibold'>Include:</label>
                <div className='flex gap-2'>
                    <input type='checkbox' id='all' className='w-5'
                    onChange={handleChange}
                    checked={sidebardata.include ==='all'}
                    />
                    <span>All</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='title' className='w-5'
                    onChange={handleChange}
                    checked={sidebardata.title}/>
                    <span>Title</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='description' className='w-5'
                    onChange={handleChange}
                    checked={sidebardata.description}/>
                    <span>Description</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='tags' className='w-5'
                    onChange={handleChange}
                    checked={sidebardata.tags}/>
                    <span>Tags</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='author' className='w-5'
                    onChange={handleChange}
                    checked={sidebardata.author}/>
                    <span>Author</span>
                </div>
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
                <label className='font-semibold'>Type:</label>
                <div className='flex gap-2'>
                    <input type='checkbox' id='video' className='w-5'
                    onChange={handleChange}
                    checked={sidebardata.video}/>
                    <span>Video</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='pictures' className='w-5'
                    onChange={handleChange}
                    checked={sidebardata.pictures}/>
                    <span>Pictures</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='other' className='w-5'
                    onChange={handleChange}
                    checked={sidebardata.other}/>
                    <span>Other</span>
                </div>
            </div> */}
            {/* above need to be configured */}
            <div className='flex items-center gap-2'>
                <label className='font-semibold'>Sort:  </label>
                <select 
                    onChange={handleChange}
                    defaultValue={'created_at_desc'}
                    id='sort_order'
                    className='border rounded-lg p-3'>
                    {/* <option value='likes_desc'>Likes High to Low</option>
                    <option value='likes_asc'>Likes Low to High</option> */}
                    <option value='createdAt_desc'>Latest</option>
                    <option value='createdAt_asc'>Oldest</option>
                </select>
            </div>
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hove:opacity-95'>Search</button>
        </form>
        </div>

        <div className='flex-1'>
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Post Results:</h1>
            <div className='p-7 flex flex-wrap gap-4'>
                    {!loading && posts.length === 0 && (
                        <p className='text-xl text-slate-700'>No post found!</p>
                    )}
                    {loading && (
                        <p className='text-xl text-slate-700 text-center w-full'>Loading....</p>
                    )}
                    { !loading && posts && posts.map((post) => (
                        <PostItem key={post._id}  post={post} />
                    ))}
                    {showMore && (
                        <button
                            onClick={onShowMoreClick}
                            className='text-green-700 hover:underline p-7 text-center w-full'>
                                Show more
                            </button>
                    )}
            </div>
        </div>
    </div>
    ); 
}
