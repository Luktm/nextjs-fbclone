// create firebase project, go to settings, select web option.
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBmpwKl4vH5FUO_-gjc6vhh2CUtET77Vxs',
  authDomain: 'facebook-2-yt-455da.firebaseapp.com',
  projectId: 'facebook-2-yt-455da',
  storageBucket: 'facebook-2-yt-455da.appspot.com',
  messagingSenderId: '380086702919',
  appId: '1:380086702919:web:0f121622d717c584aaf262',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize firesotre
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };