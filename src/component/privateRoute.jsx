import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import UseAuth from "../hooks/useAuthStatus";
import Spinner from "./spinner";

export default function privateRoute() {
  const [loggedin, loading] = UseAuth();
  if (loading) {
    return <Spinner />;
  }
  return loggedin ? <Outlet /> : <Navigate to="/sign-in" />;
}
