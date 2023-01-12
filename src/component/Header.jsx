import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const getLocation = (route) => {
    console.log(location.pathname);
    if (location.pathname === route) {
      return true;
    }
  };
  return (
    <div className="border shadow-sm bg-white">
      <header className="flex justify-between max-w-6xl mx-auto items-center">
        <div>
          <img
            className=" cursor-pointer h-5"
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              onClick={() => navigate("/")}
              className={` cursor-pointer py-4 text-gray-400 font-semibold text-sm   ${
                getLocation("/") &&
                "border-b-[3px]  border-b-red-500 text-black"
              }`}
            >
              Home
            </li>
            <li
              onClick={() => navigate("/offers")}
              className={` cursor-pointer py-4 text-gray-400 font-semibold text-sm   ${
                getLocation("/offers") &&
                "border-b-[3px]  border-b-red-500 text-black"
              }`}
            >
              Offers
            </li>
            <li
              onClick={() => navigate("/sign-in")}
              className={`cursor-pointer py-4 text-gray-400 font-semibold text-sm   ${
                getLocation("/sign-in") &&
                "border-b-[3px]  border-b-red-500 text-black"
              }`}
            >
              Sign-in
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
