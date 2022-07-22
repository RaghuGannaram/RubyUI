import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  useTheme,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import { getAllUsers, followUser } from "../Redux/userSlice";

export default function WhoToFollow({ status, user }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);

  const handleFollow = async (event) => {
    const followData = {
      followerId: profile._id,
      userId: user._id,
    };
    await dispatch(followUser(followData));
    await dispatch(getAllUsers());
  };

  return (
    <Box
      sx={{
        mt: "10px",
        borderRadius: theme.shape.borderRadiusSmall,
        border: `1px solid ${theme.palette.background.dark}`,
        backgroundColor: theme.palette.background.main,
        boxShadow: 5,
        "&:hover": {
          backgroundColor: theme.palette.background.dark,
        },
      }}
    >
      <Grid container sx={{ display: "flex", flexDirection: "column" }}>
        <Grid item>
          <Grid container sx={{ padding: "10px 10px 2px 10px" }}>
            <Grid item sx={{ alignSelf: "center", ml: "5px" }}>
              <Link to={`/profile/${user._id}`}>
                <img
                  src={`data:image/jpg; base64,${user?.profilePicture}`}
                  alt="profilPicture"
                  style={{ width: "80px", borderRadius: "50%" }}
                />
              </Link>
            </Grid>
            <Grid item sx={{ alignSelf: "center", ml: "20px" }}>
              <Link to={`/profile/${user._id}`}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: theme.palette.secondary.main,
                    "&:hover": {
                      color: theme.palette.secondary.dark,
                    },
                  }}
                >
                  {user.username}
                </Typography>
              </Link>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: theme.palette.secondary.main,
                }}
              >
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
            pt: "5px",
            pb: "10px",
          }}
        >
          <Grid item>
            <Typography
              sx={{
                fontSize: "13px",
                padding: "4px 10px",
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
                padding: "2px 20px",
                borderRadius: theme.shape.borderRadius,
                color: theme.palette.secondary.main,
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
              onClick={handleFollow}
            >
              {user.followers.includes(profile._id) ? "Unfollow" : "Follow"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
