import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
export default function Oath() {
  const navigate = useNavigate();
  async function googleSigninHandler() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log(user);
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      setDoc(docRef, {
        name: user.displayName,
        email: user.email,
        timestamp: serverTimestamp(),
      });
    }
    navigate("/");
  }
  return (
    <button
      type="button"
      onClick={googleSigninHandler}
      className="w-full flex justify-center items-center bg-red-600 hover:bg-red-700 p-3 rounded shadow active:bg-red-800"
    >
      <FcGoogle className="mr-4" />
      Continue with Google
    </button>
  );
}
