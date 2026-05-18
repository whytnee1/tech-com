// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAG7k0A-oTYOX4l_zW7_Gj3ChLjcnnpGdA",
  authDomain: "tech-com-9b78c.firebaseapp.com",
  projectId: "tech-com-9b78c",
  storageBucket: "tech-com-9b78c.firebasestorage.app",
  messagingSenderId: "859741619449",
  appId: "1:859741619449:web:d020d4fa0b50cadde64e28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export {db}