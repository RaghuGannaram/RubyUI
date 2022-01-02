import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
const theme = createTheme({});

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

console.log(
  "Welcome to Ruby UI, Lets inspect for any console errors 😜 "
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
