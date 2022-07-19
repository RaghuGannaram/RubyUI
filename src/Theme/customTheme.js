import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(0,150,102,1)",
      light: "rgba(105, 195, 156, 1)",
      dark: "rgba(0, 119, 79, 1)",
    },
    secondary: {
      main: "rgba(0, 144, 175, 1)",
      //   light: "",
      //   dark: "",
    },
    background: {
      main: "rgba(100, 100, 100, 1)",
      light: "rgba(150, 150, 150, 1)",
      dark: "rgba(50, 50, 50, 1)",
    },
  },
});

export default theme;
