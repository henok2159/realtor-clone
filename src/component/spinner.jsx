import React from "react";
import Spinner from "../assets/svg/Spin.svg";

export default function spinner() {
  return (
    <div className=" bg-black bg-opacity-50 flex justify-center items-center fixed left-0 right-0 top-0 bottom-0 z-50">
      <div>
        <img src={Spinner} alt="loading" />
      </div>
    </div>
  );
}
