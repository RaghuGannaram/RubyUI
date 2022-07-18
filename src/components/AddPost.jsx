import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Input } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { addNewPost } from "../Redux/postSlice";

export default function AddPost() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [postText, setPostText] = useState("");
  const { profile } = useSelector((state) => state.auth);

  const handleAddPost = async () => {
    console.log("in the handlepost");
    let post = {
      author: {
        id: profile._id,
        name: profile.username,
        handle: profile.handle,
      },
      description: postText,
    };
    await dispatch(addNewPost(post));
    setPostText("");
  };

  return (
    <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
      <Grid container>
        <Grid item sx={{ paddingRight: "1rem" }}>
          <img
            width="150px"
            src={`data:image/jpg; base64,${profile?.profilePicture}`}
            alt="profile"
          />
        </Grid>
        <Grid item flexGrow="1">
          <Box padding=".5rem 0">
            <Input
              sx={{ width: "100%" }}
              multiline
              rows="2"
              disableUnderline
              type="text"
              value={postText}
              placeholder="What's happening?"
              onChange={(event) => setPostText(event.target.value)}
            />
          </Box>
          <Box
            textAlign="right"
            padding=".5rem auto"
            borderTop="1px solid #ccc"
          >
            <Button
              sx={{
                fontSize: "12px",
                margin: "5px",
                color: "primary",
                borderRadius: theme.shape.borderRadius,
              }}
              variant="contained"
              disabled={postText.length === 0}
              onClick={handleAddPost}
            >
              Post
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
