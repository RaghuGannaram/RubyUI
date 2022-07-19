import React from "react";
import { useSelector } from "react-redux";
import { useTheme, Typography, Button, Grid } from "@mui/material";
import { Box } from "@mui/system";

export default function WhoToFollow({ user }) {
  const theme = useTheme();
  const { profile } = useSelector((state) => state.auth);

  return (
    <Box
      sx={{
        border: "2px solid #333",
        padding: "5px",
        borderRadius: "5px",
        mt:"10px"
      }}
    >
      <Grid container sx={{ display: "flex", flexDirection: "column" }}>
        <Grid item>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Grid item>
              <img
                src={`data:image/jpg; base64,${user?.profilePicture}`}
                alt="profilPicture"
                style={{ width: "80px", borderRadius: "50%" }}
              />
            </Grid>
            <Grid item>
              <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                {user.username}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#555" }}>
                @{user.handle}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            margin: "5px 0",
          }}
        >
          <Grid item>
            <Typography
              sx={{
                fontSize: "12px",
                background: "#ccc",
                borderRadius: theme.shape.borderRadius,
                padding: "5px 10px",
                margin: "5px",
                color: "#777",
              }}
            >
              {user.followings.includes(profile._id) ? "" : "Not"} follows you
            </Typography>
          </Grid>
          <Grid item>
            <Button
              size="small"
              sx={{
                borderRadius: theme.shape.borderRadius,
                textTransform: "capitalize",
                padding: "3px 20px",
                margin: "5px",
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
      </Grid>
    </Box>
  );
}
