import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ path, ...props }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) {
    return <Route path={path} {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
}
