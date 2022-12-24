// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import * as dbService from "firebase/firestore";
import {
  getFirestore,
  addDoc,
  collection,
  getDoc,
  doc,
  getDocs,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  getStorage,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseInstance = getAuth();
export const authService = getAuth(app);
// export { dbService };
export const dbService = getFirestore(app);
export {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  updateDoc,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
};
export const storageService = getStorage();
