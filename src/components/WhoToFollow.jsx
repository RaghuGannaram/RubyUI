import { Typography, useTheme } from "@mui/material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function WhoToFollow({ user }) {
  const theme = useTheme();
  return (
    <Box margin="1rem 0">
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Grid container alignItems="center" ml={"15px"}>
            <Grid item sx={{ paddingRight: "12px" }}>
              <img src="/icon.png" width="50px" alt="icon" />
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                    {user.name}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography
                      sx={{ fontSize: "14px", mr: "6px", color: "#555" }}
                    >
                      {user.handle}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        background: "#ccc",
                        borderRadius: theme.shape.borderRadius,
                        padding: "5px 10px",
                        color: "#777",
                      }}
                    >
                      follows you
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            size="small"
            sx={{
              borderRadius: theme.shape.borderRadius,
              textTransform: "capitalize",
              mb: "10px",
              padding: "3px 20px",
              background: "#008ace",
              "&:hover": {
                background: "#006192",
              },
            }}
            variant="contained"
          >
            Follow
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
