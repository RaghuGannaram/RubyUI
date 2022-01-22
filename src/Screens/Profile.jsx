import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link as RouteLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  MoreHoriz as MoreHorizIcon,
  MailOutline as MailOutlineIcon,
  LocationOn as LocationOnIcon,
  InsertLink as InsertLinkIcon,
  DateRange as DateRangeIcon,
} from "@mui/icons-material/";
import { Box } from "@mui/system";
import format from "date-fns/format";
import Post from "../Components/Post";
import { getUserDetails,followUser } from "../Redux/userSlice";
import { getUserPosts, getPostDetails } from "../Redux/postSlice";
import axios from "axios";

export default function Profile() {

  const theme = useTheme();
  const { userId } = useParams();
  const dispatch = useDispatch();
  const {user, status, followers, followings } = useSelector((state) => state.user);
  const { postStatus, posts } = useSelector((state) => state.post);
  
  const { _id } = JSON.parse(localStorage.getItem("login"));

  useEffect(() => {
    console.log(userId)
    dispatch(getUserDetails(userId));
    dispatch(getUserPosts(userId));
  }, [dispatch, userId]);

  const handleFollow = async () => {
    const followData = {
      followerId : _id,
      userId : userId
    }
    const response =await dispatch(followUser(followData));
    console.log(response);
    dispatch(getUserDetails(userId));
  };

  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="8px 20px">
        <Grid container alignItems="center">
          <Grid item sx={{ mr: "10px" }}>
            <RouteLink to="/">
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </RouteLink>
          </Grid>

          {status === "success" && (
            <Grid item>
              <Typography variant="h6">
                {user?.username}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#555" }}>
                {user?.posts?.length} posts
              </Typography>{" "}
            </Grid>
          )}
        </Grid>
      </Box>
      <Box textAlign="center">
        {status === "loading" && <CircularProgress size={20} color="primary" />}
      </Box>
      {status === "success" && (
        <Box height="90vh" sx={{ overflowY: "scroll" }}>
          <Box position="relative">
            <img
              width="100%"
              src={user?.backgroundImage}
              alt="background"
            />
            <Box
              sx={{
                position: "absolute",
                top: 120,
                left: 15,
                background: "#eee",
                borderRadius: "50%",
              }}
            >
              <img width="150px" src={user?.profilePicture} alt="profile" />
            </Box>
          </Box>
          <Box textAlign="right" padding="10px 20px">
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
            <IconButton>
              <MailOutlineIcon />
            </IconButton>
            {(userId !== _id) &&(
              <Button
              onClick={handleFollow}
              size="small"
              sx={{
                borderRadius: theme.shape.borderRadius,
                textTransform: "capitalize",
                padding: "6px 20px",
                background: "black",
                "&:hover": {
                  background: "#333",
                },
              }}
              variant="contained"
            >
              { followers.includes(_id) ? "Unfollow" : "Follow" }
            </Button>
            )
            }
          </Box>
          <Box padding="10px 20px">
            <Typography variant="h6" sx={{ fontWeight: "500" }}>
              {user?.username}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#555" }}>
              @{user?.handle}
            </Typography>
            <Typography fontSize="16px" color="#333" padding="10px 0">
              {user?.description}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              padding="6px 0"
              flexWrap="wrap"
            >
              <Box display="flex">
                <LocationOnIcon htmlColor="#555" />
                <Typography sx={{ ml: "6px", color: "#555" }}>
                  {user?.city}
                </Typography>
              </Box>
              {/* <Box display="flex" marginLeft="1rem">
                <InsertLinkIcon htmlColor="#555" />
                <Link
                  sx={{ textDecoration: "none", marginLeft: "6px" }}
                  href={profile.website || "https:/wasifbaliyan.com"}
                >
                  {profile.website ? profile.website : "www"}
                </Link>
              </Box> */}
              <Box display="flex" marginLeft="1rem">
                <DateRangeIcon htmlColor="#555" />
                <Typography sx={{ ml: "6px", color: "#555" }}>
                  {user && format(new Date(user?.createdAt), "MMM dd yyyy")}
                </Typography>
              </Box>
            </Box>
            <Box display="flex">
              <Typography color="#555" marginRight="1rem">
                <strong style={{ color: "black", marginRight: "5px"}}>
                  {followings.length}
                </strong>
                Following
              </Typography>
              <Typography color="#555" marginRight="1rem">
                <strong style={{ color: "black", marginRight: "5px"}}>
                    {followers.length}
                </strong>
                Followers
              </Typography>
            </Box>
          </Box>
          <Box borderBottom="1px solid #ccc">
            <Typography
              display="inline-block"
              variant="caption"
              fontSize="16px"
              marginX="1rem"
              padding="6px 0"
              fontWeight="500"
              borderBottom={`4px solid ${theme.palette.primary.main}`}
            >
              Posts
            </Typography>
          </Box>
          <Box textAlign="center" marginTop="1rem">
            {postStatus === "loading" &&  <CircularProgress size={20} color="primary" /> }
          </Box>
          {postStatus === "success" && posts.map((post) => <Post key={post._id} post={post} />)}
        </Box>
      )}
    </Box>
  );
}
