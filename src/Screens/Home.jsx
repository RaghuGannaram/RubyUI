import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import {Assistant as AssistantIcon} from "@mui/icons-material";
import { Box } from "@mui/system";
import { getAllPosts } from "../Redux/postSlice";
import AddPost from "../Components/AddPost";
import Post from "../Components/Post";

export default function Home() {
  const dispatch = useDispatch();
  const { postStatus, posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="8px 20px">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">Home</Typography>
          </Grid>
          <Grid item>
            <IconButton>
              <AssistantIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box height="92vh" sx={{ overflowY: "scroll" }}>
        <AddPost />
        <Box textAlign="center" marginTop="1rem">
          {postStatus === "loading" && (
            <CircularProgress size={20} color="primary" />
          )}
        </Box>
        {postStatus === "success" &&
          posts.map((post) => <Post key={post._id} post={post} />)}
      </Box>
    </Box>
  );
}
