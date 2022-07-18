import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import store from "./Redux/store";
import theme from "./Theme/customTheme";
import App from "./App";

function Root() {
  return (
    <>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StoreProvider>
    </>
  );
}

export default Root;
