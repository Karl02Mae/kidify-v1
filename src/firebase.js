// import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/analytics';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAsaq--G971KE1IvAij26_aIS8jVzUGHEk",
  authDomain: "kidify-v1.firebaseapp.com",
  projectId: "kidify-v1",
  storageBucket: "kidify-v1.appspot.com",
  messagingSenderId: "630402313657",
  appId: "1:630402313657:web:644168b2b560075a291a68",
  measurementId: "G-78VPYBY2SH"
});

// const app = initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };
firebase.analytics();