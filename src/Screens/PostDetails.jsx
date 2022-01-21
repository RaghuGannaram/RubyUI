import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon, 
  MoreHoriz as MoreHorizIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  Sync as SyncIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  IosShare as IosShareIcon
} from "@mui/icons-material";
import { Box } from "@mui/system";
import format from "date-fns/format";
import { getPostDetails, getComments, addLike, addComment, deletePost } from "../Redux/postSlice";
import Comment from "../Components/Comment";

export default function PostDetails() {
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { postStatus, commentStatus, post, comments } = useSelector((state) => state.post);
  const [commentText, setCommentText] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { _id } = JSON.parse(localStorage.getItem("login"));

  useEffect(() => {
    console.log(postId)
    dispatch(getPostDetails(postId));
    dispatch(getComments(postId));
  }, [dispatch, postId]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeletePost = async () => {
    const response = await deletePost({ id: post._id });
    if (response) {
      history.push("/");
    }
  };

  const handleLike = async (event) => {
    event.preventDefault();
    const response = await addLike({ postId: post._id, userId: _id });
    if (response) {
      dispatch(getPostDetails(postId));
      dispatch(getComments(postId));
    }
  };



  const handleAddComment = async () => {
    const response = await dispatch(addComment({ postId, description: commentText }));
    if (response) {
      dispatch(getComments(postId));
      setCommentText("");
    }
  };

  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="8px 20px">
        <Grid container alignItems="center">
          <Grid item sx={{ mr: "10px" }}>
            <IconButton onClick={() => history.push("/")}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h6">Post</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box height="92vh" sx={{ overflowY: "scroll" }}>
        <Box textAlign="center" marginTop="1rem">
          {postStatus === "loading" && (
            <CircularProgress size={20} color="primary" />
          )}
        </Box>
        {postStatus === "success" && (
          <Box padding="0 20px">
            <Box>
              <Grid container alignItems="center">
                <Grid item>
                  <img src="/icon.png" alt="icon" width="60px" />
                </Grid>
                <Grid item flexGrow="1">
                  <Grid container justifyContent="space-between">
                    <Grid item sx={{marginLeft:"10px"}}>
                      <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                        {post.author && post.author.name}
                      </Typography>
                      <Typography sx={{ fontSize: "15px", color: "#555" }}>
                        @{post.author && post.author.handle}
                      </Typography>
                    </Grid>
                    <Grid item>
                      {postStatus === "success" &&
                        post.author &&
                        _id === post.author._id && (
                          <IconButton
                            aria-expanded={open ? "true" : undefined}
                            onClick={(e) => {
                              e.preventDefault();
                              handleClick(e); 
                            }}
                          >
                            <MoreHorizIcon />
                          </IconButton>
                        )}

                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
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
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Typography sx={{ fontSize: "20px" }}>
                {post.description}
              </Typography>
            </Box>
            <Box display="flex" padding="1rem 0" borderBottom="1px solid #ccc">
              <Typography sx={{ fontSize: "14px", mr: "6px", color: "#555" }}>
                {post && post.createdAt && format(new Date(post.createdAt), "HH:mm a")}
              </Typography>
              <Typography sx={{ fontSize: "14px", mr: "6px", color: "#555" }}>
                .
              </Typography>
              <Typography sx={{ fontSize: "14px", mr: "6px", color: "#555" }}>
                {post && post.createdAt && format(new Date(post.createdAt), "MMM dd yyyy")}
              </Typography>
            </Box>
            <Box display="flex" padding="1rem 0" borderBottom="1px solid #ccc">
              <Typography sx={{ fontSize: "14px", mr: "6px", color: "#555" }}>
                <strong>{post.likes && post.likes.length}</strong>{" "}
                Likes
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-around"
              padding=".5rem 0"
              borderBottom="1px solid #ccc"
            >
              <IconButton size="small">
                <ChatBubbleOutlineIcon fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <SyncIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={handleLike} size="small">
                {post && post.likes && post.likes.includes(_id) ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" /> }
              </IconButton>
              <IconButton size="small">
                <IosShareIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box>
              <Grid container>
                <Grid item>
                  <img src="/icon.png" alt="icon" width="60px" />
                </Grid>
                <Grid item flexGrow="1">
                  <Box padding=".5rem 0">
                    <Input
                      sx={{ width: "100%" }}
                      type="text"
                      value={commentText}
                      placeholder="Post your comment"
                      multiline
                      rows="2"
                      disableUnderline
                      onChange={(event) => setCommentText(event.target.value)}
                    />
                  </Box>
                  <Box textAlign="right" paddingBottom=".5rem">
                    <Button
                      sx={{ fontSize: "12px",color:"primary", borderRadius: theme.shape.borderRadius}}
                      disabled={commentText.length === 0}
                      variant="contained"
                      onClick={handleAddComment}
                    >
                      Comment
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              <Box textAlign="center" marginTop="1rem">
                {commentStatus === "loading" && (
                  <CircularProgress size={20} color="primary" />
                )}
              </Box>
              {commentStatus === "success" &&
                comments.map((comment,index) => (
                  <Comment key={index} comment={comment} />
                ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
