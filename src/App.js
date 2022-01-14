import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import {Home, Login, PostDetails, Profile} from "./Screens"
import {Layout, PrivateRoute} from "./Components";
import { setAuth } from "./Redux/authSlice";

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
    isLoggedIn&&dispatch(setAuth({ isLoggedIn }));
  }, [dispatch, isLoggedIn]);
  
  return (
    <Switch>
      
      <PrivateRoute exact path="/">
        <Layout>
          <Home />
        </Layout>
      </PrivateRoute>
      <PrivateRoute exact path="/posts/:id">
        <Layout>
          <PostDetails />
        </Layout>
      </PrivateRoute>
      <PrivateRoute exact path="/profile/:id">
        <Layout>
          <Profile />
        </Layout>
      </PrivateRoute>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
