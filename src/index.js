import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Root from "./Root";
import "./index.css";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

console.log("Welcome to Ruby UI, Lets inspect for any console errors 😜 ");

ReactDOM.render(
  <StrictMode>
    <Root />
  </StrictMode>,
  document.getElementById("root")
);
