import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(0,150,102,1)",
      light: "rgba(40, 166, 132, 1)",
      dark: "rgba(0, 121, 86, 1)",
      blur: "rgba(0,150,102,0.5)",
    },
    secondary: {
      main: "rgba(240, 240, 240, 1)",
      light: "rgba(250, 250, 250, 1)",
      dark: "rgba(200, 200, 200, 1)",
    },
    background: {
      main: "rgba(67, 67, 67, 1)",
      light: "rgba(85, 85, 85, 1)",
      dark: "rgba(38, 38, 38, 1)",
      paper: "rgba(67, 67, 67, 1)",
    },
  },
  shape:{
    borderRadius: 4,
    borderRadiusSmall: 2,
  }
});

export default theme;
