import React from "react";
import { useState } from "react";

import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Oath from "../component/Oath";
import { toast } from "react-toastify";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const onChangeForm = (e) => {
    setEmail(e.target.value);
  };
  async function forgetPasswordHandler(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("we sent an email.please check your email");
    } catch (error) {
      toast.error("we can't find the email,please insert a valid email");
    }
  }
  return (
    <section className=" h-full">
      <h1 className="text-3xl font-bold text-center my-6  p-10 md:p-0">
        Forget Password
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
          <form onSubmit={forgetPasswordHandler}>
            <input
              className=" mb-10 px-4 py-2 w-full border rounded-md transition ease-in-out focus: outline-blue-400"
              type="text"
              placeholder="email address"
              onChange={onChangeForm}
              id="email"
              value={email}
            />

            <div className="flex justify-between mb-3">
              <p>
                Don't have an account?{" "}
                <Link
                  className=" text-red-600 hover:text-red-800 transition duration-500 ease-in-out"
                  to="/sign-up"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  className=" text-blue-600 hover:text-blue-800 transition duration-500 ease-in-out"
                  to="/sign-in"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-500 py-3 rounded text-white font-medium uppercase hover:bg-blue-600 active:bg-blue-700 transition duration-150 ease-in-out "
              type="submit"
            >
              send reset password
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
