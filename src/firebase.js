// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi4_XoCP2Qy0pu8NFEEBtObH1akCJAW9E",
  authDomain: "realtor-clone-react-6dc5d.firebaseapp.com",
  projectId: "realtor-clone-react-6dc5d",
  storageBucket: "realtor-clone-react-6dc5d.appspot.com",
  messagingSenderId: "467085069570",
  appId: "1:467085069570:web:78e2ee623349b4cc36861b",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
