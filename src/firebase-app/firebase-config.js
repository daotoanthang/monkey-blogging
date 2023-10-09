import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEx7Z7Dn4v5tjsg23D-qEToDJP9zSB6a8",
  authDomain: "monkey-blogging-3db7b.firebaseapp.com",
  projectId: "monkey-blogging-3db7b",
  storageBucket: "monkey-blogging-3db7b.appspot.com",
  messagingSenderId: "936426297152",
  appId: "1:936426297152:web:13ef8ca5432aa3ea304ca5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
