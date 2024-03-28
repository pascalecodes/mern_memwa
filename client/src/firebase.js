// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-memwa-v1.firebaseapp.com",
  projectId: "mern-memwa-v1",
  storageBucket: "mern-memwa-v1.appspot.com",
  messagingSenderId: "50786751058",
  appId: "1:50786751058:web:76d2d467ec47969537858b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);