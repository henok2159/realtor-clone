import React from "react";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import Oath from "../component/Oath";
import { db } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const onChangeForm = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };
  const [showPassword, setShowPassword] = useState(false);
  async function onSubmitHandler(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timeStamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");
      console.log(user);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  }
  return (
    <section className=" h-full">
      <h1 className="text-3xl font-bold text-center my-6  p-10 md:p-0">
        Sign up
      </h1>
      <div className="  p-10 lg:p-0 max-w-6xl mx-auto mt-10 flex flex-wrap justify-center items-center">
        <div className=" w-full  md:w-[67%] lg:w-[55%] mb-6 md:mb-4 ">
          <img
            className=" w-full rounded-lg "
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
            alt="key"
          />
        </div>

        <div className="w-full md:w-[67%] lg:w-[40%] lg:pl-10 ">
          <form onSubmit={onSubmitHandler}>
            <input
              className=" mb-10 px-4 py-2 w-full border rounded-md transition ease-in-out focus: outline-blue-400"
              type="text"
              placeholder="Full Name"
              onChange={onChangeForm}
              id="name"
              value={name}
            />
            <input
              className=" mb-10 px-4 py-2 w-full border rounded-md transition ease-in-out focus: outline-blue-400"
              type="text"
              placeholder="email address"
              onChange={onChangeForm}
              id="email"
              value={email}
            />
            <div className=" relative">
              <input
                className=" mb-10 px-4 py-2 w-full border rounded-md transition ease-in-out focus: outline-blue-400"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                onChange={onChangeForm}
                id="password"
                value={password}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className=" absolute right-4 top-3 text-xl"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>
            <div className="flex justify-between mb-3">
              <p>
                have an account?{" "}
                <Link
                  className=" text-red-600 hover:text-red-800 transition duration-500 ease-in-out"
                  to="/sign-in"
                >
                  Sign-in
                </Link>
              </p>
              <p>
                <Link
                  className=" text-blue-600 hover:text-blue-800 transition duration-500 ease-in-out"
                  to="/forget-password"
                >
                  Forget Password
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-500 py-3 rounded
               text-white font-medium uppercase hover:bg-blue-600 
               active:bg-blue-700 transition duration-150 ease-in-out "
              type="submit"
            >
              Sign up
            </button>
            <div className="flex  items-center my-4 before:border-t  before:border-gray-300 before:flex-1 after:border-t after:flex-1  after:border-gray-300">
              <p className=" text-center font-semibold mx-4">OR</p>
            </div>
            <Oath />
          </form>
        </div>
      </div>
    </section>
  );
}
