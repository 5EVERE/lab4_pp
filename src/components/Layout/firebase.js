// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCQIGTebZdSCxHGQPjiCDRLvSVcCife_s",
  authDomain: "lab4-auth.firebaseapp.com",
  projectId: "lab4-auth",
  storageBucket: "lab4-auth.appspot.com",
  messagingSenderId: "798584951967",
  appId: "1:798584951967:web:0d6022f31c88b40a08feaa",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();