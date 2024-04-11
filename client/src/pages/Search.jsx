import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form className='flex flex-col gap-8'> 
            <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                <input type='text' id='searchTerm' placeholder='Search...'
                className='border rounded=lg p-3 w-full'/>
            </div>
            {/* these are not functional yet */}
            <div className='flex gap-2 flex-wrap items-center'>
                <label className='font-semibold'>Include:</label>
                <div className='flex gap-2'>
                    <input type='checkbox' id='all' className='w-5'/>
                    <span>All</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='title' className='w-5'/>
                    <span>Title</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='description' className='w-5'/>
                    <span>Description</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='tags' className='w-5'/>
                    <span>Tags</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='author' className='w-5'/>
                    <span>Author</span>
                </div>
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
                <label className='font-semibold'>Type:</label>
                <div className='flex gap-2'>
                    <input type='checkbox' id='video' className='w-5'/>
                    <span>Video</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='pictures' className='w-5'/>
                    <span>Pictures</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='other' className='w-5'/>
                    <span>Other</span>
                </div>
            </div>
            {/* above need to be configured */}
            <div>
                <label className='font-semibold'>Sort:</label>
                <select id="sort_order"
                className='border rounded-lg p-3'>
                    <option>Likes High to Low</option>
                    <option>Likes Low to High</option>
                    <option>Latest</option>
                    <option>Oldest</option>
                </select>
            </div>
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hove:opacity-95'>Search</button>
        </form>
        </div>

        <div className=''>
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Post Results:</h1>

        </div>
    </div>
  )
}
