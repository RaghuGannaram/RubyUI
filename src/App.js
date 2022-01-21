import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import PostDetails from "./Screens/PostDetails";
import Profile from "./Screens/Profile";
import Layout from "./Components/Layout";
import PrivateRoute from "./Components/PrivateRoute";
import { setAuthStatus } from "./Redux/authSlice";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if ("login" in localStorage) {
  //     const login = JSON.parse(localStorage.getItem("login"));
  //     axios.defaults.headers.common["authorization"] = `Bearer ${login.token}`;
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    const { isLoggedIn } = JSON.parse(localStorage.getItem("login")) || {};
    isLoggedIn&&dispatch(setAuthStatus({ isLoggedIn }));
  }, [dispatch, isLoggedIn]);
  
  return (    
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <PrivateRoute exact path="/">
        <Layout>
          <Home />
        </Layout>
      </PrivateRoute>
      <PrivateRoute exact path="/posts/:postId">
        <Layout>
          <PostDetails />
        </Layout>
      </PrivateRoute>
      <PrivateRoute exact path="/profile/:userId">
        <Layout>
          <Profile />
        </Layout>
      </PrivateRoute>
    </Switch>
  );
}

export default App;
