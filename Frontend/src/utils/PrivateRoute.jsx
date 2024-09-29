import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ child, reverse = false }) => {
  const accessToken = localStorage.getItem("access_token") || null;
  if (reverse) {
    return accessToken ? window.history.back() : child;
  }
  return accessToken ? child : <Navigate to="/login" replace />;
};

export default PrivateRoute;
