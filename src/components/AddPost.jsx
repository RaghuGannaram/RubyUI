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
    <Box
      sx={{
        padding: "1rem",
        borderBottom: `1px solid ${theme.palette.background.dark}`,
      }}
    >
      <Grid container>
        <Grid item sx={{ paddingRight: "1rem" }}>
          <img
            src={`data:image/jpg; base64,${profile?.profilePicture}`}
            alt="profile"
            style={{ width: "80px", borderRadius: "50%" }}
          />
        </Grid>
        <Grid item flexGrow="1">
          <Box padding=".5rem 0">
            <Input
              sx={{ width: "100%", color: theme.palette.secondary.main }}
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
            sx={{
              textAlign: "right",
              padding: "0.5rem auto",
              borderTop: `1px solid ${theme.palette.background.dark}`,
            }}
          >
            <Button
              disabled={postText.length === 0}
              sx={{
                fontSize: "12px",
                margin: "5px",
                borderRadius: theme.shape.borderRadius,
                color: theme.palette.secondary.main,
                "&:disabled": {
                  backgroundColor: theme.palette.primary.main,
                },
              }}
              variant="contained"
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
