import { useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";

export default function CreatePost() {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        mediaUrls: [],
    });
    console.log(formData)
    console.log(files.length)
    const handleMediaSubmit = (e) => {
        if (files.length > 0 && files.length < 7) {
          const promises = [];
    
          for (let i = 0; i < files.length; i++) {
            promises.push(storeMedia(files[i]));
          }
          Promise.all(promises)
            .then((urls) => {
              setFormData({
                ...formData,
                mediaUrls: formData.mediaUrls.concat(urls),
              });
            })
            .catch((err) => {
                console.log('failed now')
            });
        } else {
          console.log('failed else')
        }
      };

    const storeMedia = async (file) => {
    return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                reject(error);
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {resolve(downloadURL)
                });
                console.log('file sent to firebase')
            }
        );
    }); 
};
  

  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Moment</h1>
        <form className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type="text" placeholder='Title' className='border p-3 rounded-lg' id='title' maxLength='62' minLength='4' required/>
                <input type="text" placeholder='Caption' className='border p-3 rounded-lg' id='caption' required/>
                <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required/>
                <input type="text" placeholder='Tags' className='border p-3 rounded-lg' id='tags'/>
                <div className='flex gp-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type="checkbox" id="privacy" className='w-5' />
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
                <button type="button"  onClick={handleMediaSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                </div>
                <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:80'> Create Moment</button>
            </div>
        </form>
    </main>
  );
}
