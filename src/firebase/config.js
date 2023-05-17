
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getEnvironments } from "../helpers";

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID
} = getEnvironments();

// const firebaseConfig = {
//   apiKey: "AIzaSyDEyR4QG5PQ1vC_yf4PvO_YpYFr_i9G7m0",
//   authDomain: "react-cursos-e3966.firebaseapp.com",
//   projectId: "react-cursos-e3966",
//   storageBucket: "react-cursos-e3966.appspot.com",
//   messagingSenderId: "75074024207",
//   appId: "1:75074024207:web:3f9dae84138425dadf047a"
// };

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

console.log(firebaseConfig);

export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB   = getFirestore(FirebaseApp);