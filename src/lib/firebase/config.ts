import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: "quest-study-hub",
  appId: "1:1016579917018:web:5962ea29de3507320991e3",
  storageBucket: "quest-study-hub.firebasestorage.app",
  apiKey: "AIzaSyA7FWFrqmYrUM7N9Lcq14rr8CCVlyyshb0",
  authDomain: "quest-study-hub.firebaseapp.com",
  messagingSenderId: "1016579917018",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app as firebaseApp, auth, db, storage };
