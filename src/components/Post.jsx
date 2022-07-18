import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useSelector, useDispatch } from "react-redux";
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
  Close as CloseIcon,
  Delete as DeleteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  IosShare as IosShareIcon,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {
  getAllPosts,
  addLike,
  addComment,
  deletePost,
} from "../Redux/postSlice";
import Modal from "./Modal";

export default function Post({ post }) {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { profile } = useSelector((state) => state.auth);

  const handleChatIconClick = (event) => {
    event.preventDefault();
    setOpenModal(true);
  };

  const handleLikePost = async (event) => {
    event.preventDefault();
    const likeData = {
      postId: post._id,
      userId: profile._id,
    };
    await dispatch(addLike(likeData));
    await dispatch(getAllPosts());
  };

  const handleAddComment = async () => {
    const commentData = {
      postId: post._id,
      author: {
        id: profile._id,
        name: profile.username,
        handle: profile.handle,
      },
      description: commentText,
    };
    await dispatch(addComment(commentData));
    setCommentText("");
  };

  const handleDeletePost = async (event) => {
    console.log("clicked deletePost");
    event.preventDefault();
    const postData = {
      postId: post._id,
      userId: profile._id,
    };
    await dispatch(deletePost(postData));
    await dispatch(getAllPosts());
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
              <Link to={`/profile/${post.author.id}`}>
              <img
                width="150px"
                src={`data:image/jpg; base64,${post?.profilePicture}`}
                alt="profile"
              />
              </Link>
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
                    {post.author.id === profile._id && (
                      <IconButton
                        aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                        onClick={(event) => {
                          event.preventDefault();
                          setAnchorEl(event.currentTarget);
                        }}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                    )}
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={() => setAnchorEl(null)}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={(event) => handleDeletePost(event)}>
                        Delete Post
                        <IconButton>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </MenuItem>
                      <MenuItem
                        onClick={(event) => {
                          event.preventDefault();
                          setAnchorEl(null);
                        }}
                      >
                        Close Menu
                        <IconButton>
                          <CloseIcon fontSize="small" />
                        </IconButton>
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
                  <IconButton size="small" onClick={handleChatIconClick}>
                    <ChatBubbleOutlineIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <SyncIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={(event) => handleLikePost(event)}
                  >
                    {post.likes.includes(profile._id) ? (
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
      <Modal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        button={"Comment"}
        text={commentText.length}
        handleSubmit={handleAddComment}
      >
        <Box>
          <Grid container>
            <Grid item>
            <img
                width="150px"
                src={`data:image/jpg; base64,${profile.profilePicture}`}
                alt="profile"
              />
            </Grid>
            <Grid item flexGrow="1">
              <Box padding=".5rem">
                <Input
                  sx={{ width: "95%", ml: "10px" }}
                  placeholder="Post your comment"
                  rows="2"
                  multiline
                  disableUnderline
                  type="text"
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
