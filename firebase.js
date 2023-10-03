// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Initialize Firebase and get auth directly in the export statement
// export const app = initializeApp({
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
// });

export const app = initializeApp({
  apiKey: "AIzaSyCFckYuu9FVUk-CGccHkGVr1dfqgmDS4i4",
  authDomain: "next-auth-system-acf0f.firebaseapp.com",
  projectId: "next-auth-system-acf0f",
  storageBucket: "next-auth-system-acf0f.appspot.com",
  messagingSenderId: "523013525820",
  appId: "1:523013525820:web:f1a7b1641d34f5df664e39"
});

export const auth = getAuth(app);


