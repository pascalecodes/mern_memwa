import React from 'react'

function CreatePost() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Moment</h1>
        <form className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type="text" placeholder='Title' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='4' required/>
                <input type="text" placeholder='Caption' className='border p-3 rounded-lg' id='caption' required/>
                <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required/>
                <input type="text" placeholder='Tags' className='border p-3 rounded-lg' id='description'/>
                <div className='flex flex-col items-center gp-2'>
                    <div className='flex gap-2'>
                        <input type="checkbox" id="privacy" className='w-5' />
                        <span>Make Private</span>
                    </div>
                </div>  
            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'> Media: 
                <span className='font-normal text-gray-600 ml-2'>You can add videos, pictures, and audio files for your moment</span></p>
                <div className='flex gap-4'>
                <input className='p-3 border border-gray-300 rounded w-full' type="file" id="media" accept='image/*, video/*, audio/*' multiple required/>
                <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                </div>
                <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:80'> Create Moment</button>
            </div>
            
        </form>
    </main>
  )
}

export default CreatePost
