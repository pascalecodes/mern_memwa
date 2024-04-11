import { useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import {useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";


export default function CreatePost() {
    const {currentUser} = useSelector(state => state.user);
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        mediaUrls: [],
        title: '',
        caption: '',
        description: '',
        tags:[],
        privacy: false,
        cloudinaryId: '',
        likes: 0,
    });
    console.log(formData)
    const [uploading, setUploading] = useState(false);
    const [mediaUploadError, setMediaUploadError] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleMediaSubmit = (e) => {
        if (files.length > 0 && files.length + formData.mediaUrls.length < 7) {
            setUploading(true);
            setMediaUploadError(false);
          const promises = [];
    
          for (let i = 0; i < files.length; i++) {
            promises.push(storeMedia(files[i]));
          }
          Promise.all(promises).then((urls) => {
            setFormData({ ...formData, mediaUrls: formData.mediaUrls.concat(urls)
            });
            setMediaUploadError(false);
            setUploading(false)
          }).catch((err) => {
            setMediaUploadError('Image upload failed (2.5mb max per file)');
          })
        }else {
            setMediaUploadError('You can only upload 6 files per post');
            setUploading(false);
        }
    };

    const storeMedia = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed', 
                (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                reject(error);
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {resolve(downloadURL)
                });
            }
        );
    }); 
};
  
const handleRemoveMedia = (index) => {
    setFormData ({
      ...formData,
      mediaUrls: formData.mediaUrls.filter((_, i) => i !== index),  
    });

}

const handleChange = (e) => {
    //testing adding tags into array
  
    if (
        e.target.id === 'privacy') {
        setFormData({
            ...formData, [e.target.id]: e.target.checked,
        });
    }


    if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }
};
const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        if (formData.mediaUrls.length < 1 )
        return setError('You must upload at least one image');
        setLoading(true);
        setError(false);
        const res = await fetch('/api/post/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                userRef: currentUser._id
            }),
        });
        const data = await res.json();
        setLoading(false);
        if (data.success === false) {
            setError(data.message);
        }
        navigate(`/post/${data._id}`)
    } catch (error) {
        setError(error.message);
        setLoading(false);
    }
}
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Moment</h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type="text" placeholder='Title' className='border p-3 rounded-lg' id='title' maxLength='62' minLength='4' required
                onChange={handleChange}
                value={formData.title}/>
                <input type="text" placeholder='Caption' className='border p-3 rounded-lg' id='caption' required
                onChange={handleChange}
                value={formData.caption}/>
                <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required
                onChange={handleChange}
                value={formData.description}/>
                <input type="text" placeholder='Tags' className='border p-3 rounded-lg' id='tags'
                onChange={handleChange}
                value={formData.tags}/>
                <div className='flex gp-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type="checkbox" id="privacy" className='w-5' 
                        onChange={handleChange}
                        checked={formData.privacy}/>
                        <span>Make Private</span>
                    </div>
                </div> 
            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <span className='font-semibold'>You can add videos, pictures, and audio files for your moment</span>
                <p className='font-semibold'> Media: 
                <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span></p>
                <div className='flex gap-4'>
                <input onChange={(e) => setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type="file" id='media' accept='image/*, video/*, audio/*' multiple />
                <button disabled={uploading} type="button"  onClick={handleMediaSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
                    {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
                <p className="text-red-700 text-sm">{mediaUploadError && mediaUploadError}</p>
                {
                    formData.mediaUrls.length > 0 && formData.mediaUrls.map((url, index) => (
                        <div key={url} className="flex justify-between p-3 border items-center"> 
                            <img src={url} alt='Posting image' className="w-20 h-20 object-contain rounded-lg" />
                            <button type='button' onClick={() => handleRemoveMedia(index)} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">Delete</button>
                        </div>   
                    ))
                }

                <button disabled={loading || uploading} className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:80'>{loading ? 'Creating...' : 'Create Moment'}</button>
                {error && <p className="text-red-700 text-sm">{error}</p>}
            </div>
        </form>
    </main>
  );
}
