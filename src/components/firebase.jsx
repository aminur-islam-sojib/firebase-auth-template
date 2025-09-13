import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfAIj2xzDrHNwOvxTZYl6SwZgwETTRQ1A",
  authDomain: "test-auth-c97e4.firebaseapp.com",
  projectId: "test-auth-c97e4",
  storageBucket: "test-auth-c97e4.firebasestorage.app",
  messagingSenderId: "914227266565",
  appId: "1:914227266565:web:ab830b234c6d75b93a086c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
