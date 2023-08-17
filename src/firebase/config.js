// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB6qAkG61n7UBM8zNW60LKMz1xheqRsqZI',
  authDomain: 'fast-chat-2883c.firebaseapp.com',
  projectId: 'fast-chat-2883c',
  storageBucket: 'fast-chat-2883c.appspot.com',
  messagingSenderId: '1046586056259',
  appId: '1:1046586056259:web:34f473a2661409093d7ef6',
  measurementId: 'G-79BW047462',
  databaseURL:
    'https://fast-chat-2883c-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

// Initialize Firebase
const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps[0];

export default firebaseApp;
