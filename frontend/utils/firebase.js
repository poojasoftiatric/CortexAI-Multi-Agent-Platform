// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cortexai-32c1c.firebaseapp.com",
  projectId: "cortexai-32c1c",
  storageBucket: "cortexai-32c1c.firebasestorage.app",
  messagingSenderId: "646036840328",
  appId: "1:646036840328:web:51ab98fcd4d87a7355a43d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()