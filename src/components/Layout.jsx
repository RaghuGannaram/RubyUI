import React, { } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
// import { useTheme } from "@mui/system";
// import { getUsers } from "../Redux/authSlice";
// import { useDispatch } from "react-redux";

export default function Layout({ children }) {
  // const theme = useTheme();
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getUsers());
  // }, [dispatch]);
  return (
    <Box
      sx={{
        maxWidth: "90vw",
        margin: "0 auto",
      }}
    >
      <Grid container>
        <Grid item xs={2} lg={2}>
          <LeftSidebar />
        </Grid>
        <Grid item xs={10} lg={10}>
          <Grid container>
            <Grid item xs={12} md={8} lg={9}>
              <Box
                sx={{
                  height: "100vh",
                  margin: "0 1rem",
                  borderLeft: "1px solid #ccc",
                  borderRight: "1px solid #ccc",
                }}
              >
                {children}
              </Box>
            </Grid>
            <Grid item xs={0} md={3} lg={3} sx={{display : {xs: "none", md:"block"}}}>
              <RightSidebar />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
