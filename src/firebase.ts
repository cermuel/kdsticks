import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "kdsticks.firebaseapp.com",
  projectId: "kdsticks",
  storageBucket: "kdsticks.firebasestorage.app",
  //   storageBucket: "kdsticks.appspot.com",
  // storageBucket: "kdsticks-bucket",

  messagingSenderId: "1053715586068",
  appId: "1:1053715586068:web:8bce75cd9ab618e1a89b01",
  measurementId: "G-EMGG580HLV",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
