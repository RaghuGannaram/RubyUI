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
        mt:"10px",
        padding: "5px",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.main,
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
              <Typography sx={{ fontSize: "16px", fontWeight: "500", color: theme.palette.secondary.main }}>
                {user.username}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: theme.palette.secondary.main }}>
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
                fontSize: "13px",
                padding: "4px 10px",
                margin: "5px",
                borderRadius: theme.shape.borderRadius,
                color: theme.palette.secondary.main,
                backgroundColor: theme.palette.primary.main,
              }}
            >
              {user.followings.includes(profile._id) ? "" : "Not"} follows you
            </Typography>
          </Grid>
          <Grid item>
            <Button
              size="small"
              sx={{
                textTransform: "capitalize",
                margin: "5px",
                padding: "2px 20px",
                borderRadius: theme.shape.borderRadius,
                color: theme.palette.secondary.main,
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Follow
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
