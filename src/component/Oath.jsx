import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function Oath() {
  return (
    <button className="w-full flex justify-center items-center bg-red-600 hover:bg-red-700 p-3 rounded shadow">
      <FcGoogle className="mr-4" />
      Continue with Google
    </button>
  );
}
