import React, { } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/system";

export default function Layout({ children }) {
  const theme = useTheme();
 
  return (
    <Box
      sx={{
        maxWidth: "90vw",
        margin: "0 auto",
        backgroundColor: theme.palette.background.main,
      }}
    >
      <Grid container>
        <Grid item xs={2} md={1} lg={2}>
          <LeftSidebar />
        </Grid>
        <Grid item xs={10} md={11} lg={10}>
          <Grid container>
            <Grid item xs={12} md={8} lg={9}>
              <Box
                sx={{
                  height: "100vh",
                  margin: "0 1rem",
                  borderLeft: `1px solid ${theme.palette.background.light}`,
                  borderRight: `1px solid ${theme.palette.background.light}`,
                }}
              >
                {children}
              </Box>
            </Grid>
            <Grid item xs={0} md={4} lg={3} sx={{display : {xs: "none", md:"block"}}}>
              <RightSidebar />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
