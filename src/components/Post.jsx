import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Grid,
  IconButton,
  Input,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  MoreHoriz as MoreHorizIcon, 
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  Sync as SyncIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  IosShare as IosShareIcon
} from "@mui/icons-material";
import { Box } from "@mui/system";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { getProfile } from "../redux/authSlice";
import { getPosts, updateLike } from "../redux/postSlice";
import Modal from "./Modal";
import { addComment, deletePost, likeOrDislikePost } from "../api";

export default function Post({ post, profile }) {

  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { _id } = JSON.parse(localStorage.getItem("login"));

  const handleLike = async (event) => {
    event.preventDefault();
    dispatch(updateLike({ id: post._id }));
    const response = await likeOrDislikePost({ id: post._id });
    if (response.message !== "Post updated successfully.") {
      dispatch(updateLike({ id: post._id }));
    }
  };

  const handleAddComment = async () => {
    const response = await addComment({ id: post._id, text: commentText });
    if (response) {
      setCommentText("");
    }
  };

  const handleDeletePost = async () => {
    const response = await deletePost({ id: post._id });
    if (response) {
      if (profile) {
        dispatch(getProfile(post.author.id));
      } else {
        dispatch(getPosts());
      }
    }
  };

  
  return (
    <>
      <Link
        to={`/posts/${post._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Box
          padding="1rem"
          sx={{
            "&:hover": {
              backgroundColor: "#eee",
            },
          }}
        >
          <Grid container flexWrap="nowrap">
            <Grid item sx={{ paddingRight: "1rem" }}>
              {/* <Link to={`/profile/${post.author.id}`}> */}
                <img src="/logo.png" alt="lgoog" width="50px" />
              {/* </Link> */}
            </Grid>
            <Grid item flexGrow="1">
              <Box>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="nowrap"
                >
                  <Grid item>
                    <Box display="flex">
                      <Typography
                        sx={{ fontSize: "16px", fontWeight: 500, mr: "6px" }}
                      >
                        {post.author.name}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                      >
                        @{post.author.handle}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                      >
                        .
                      </Typography>
                      <Typography
                        sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                      >
                        {formatDistanceToNow(new Date(post.createdAt))}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "15px", color: "#555" }}>
                        {post.description}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    {post.author.id === _id && (
                      <IconButton
                        aria-expanded={open ? "true" : undefined}
                        onClick={(event) => {
                          event.preventDefault();
                          setAnchorEl(event.currentTarget)
                        }}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                    )}
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={()=>{setAnchorEl(null)}}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeletePost();
                        }}
                      >
                        Delete Post
                      </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  marginRight="5rem"
                  marginTop=".8rem"
                >
                  <IconButton
                    onClick={(event) => {
                      event.preventDefault();
                      setOpenModal(true);
                    }}
                    size="small"
                  >
                    <ChatBubbleOutlineIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <SyncIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={handleLike} size="small">
                    {post.isLiked ? (
                      <FavoriteIcon fontSize="small" />
                    ) : (
                      <FavoriteBorderIcon fontSize="small" />
                    )}
                  </IconButton>
                  <IconButton size="small">
                    <IosShareIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Link>
      {openModal && (
        <Modal
          open={openModal}
          handleClose={()=>{setOpenModal(false)}}
          saveText={"Comment"}
          len={commentText.length}
          handleSave={handleAddComment}
        >
          <Box>
            <Grid container>
              <Grid item>
                <img src="/logo.png" alt="logo" width="60px" />
              </Grid>
              <Grid item flexGrow="1">
                <Box padding=".5rem 0">
                  <Input
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                    multiline
                    rows="2"
                    disableUnderline
                    type="text"
                    placeholder="Post your comment"
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      )}
    </>
  );
}
