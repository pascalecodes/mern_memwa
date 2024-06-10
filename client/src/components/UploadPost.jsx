import {useState, useRef,} from 'react'
// import { storage } from './firebase';

const UploadPost = ({ file, onUploadComplete }) => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFile = () => {
    if (file) {
      console.log(`files/${Date.now()}-${file.name}`)
      //const storageRef = storage.ref().child(`files/${Date.now()}-${file.name}`);
      // const uploadTask = storageRef.put(file);
      

      // uploadTask.on(
      //   'state_changed',
      //   (snapshot) => {
      //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //     setUploadProgress(progress);
      //   },
      //   (error) => {
      //     console.error('Error uploading file:', error);
      //   },
      //   () => {
      //     console.log('File uploaded successfully!');
      //     onUploadComplete();
      //     setUploadProgress(0);
      //   }
      // );
    }
  };

  return (
    <div>
      <button onClick={uploadFile} disabled={!file}>
        Upload
      </button>
      {uploadProgress > 0 && <div>Upload progress: {uploadProgress.toFixed(2)}%</div>}
    </div>
  );
}



export default UploadPost
