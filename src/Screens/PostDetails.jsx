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
  Sync as SyncIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
  IosShare as IosShareIcon,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import format from "date-fns/format";
import {
  getPostDetails,
  getComments,
  addLike,
  addComment,
  deletePost,
} from "../Redux/postSlice";
import Comment from "../Components/Comment";

export default function PostDetails() {
  const theme = useTheme();
  const history = useHistory();
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { postStatus, commentStatus, post, comments } = useSelector((state) => state.post);
  const [commentText, setCommentText] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLikePost = async (event) => {
    event.preventDefault();
    const likeData = {
      postId: post._id,
      userId: profile._id,
    };
    const response = await dispatch(addLike(likeData));
    response && dispatch(getPostDetails(postId));
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
    await dispatch(getComments(postId));
    setCommentText("");
  };

  const handleDeletePost = async () => {
    const response = await deletePost({ id: post._id });
    response && history.push("/");
  };
  
  useEffect(() => {
    dispatch(getPostDetails(postId));
    dispatch(getComments(postId));
  }, [dispatch, postId]);

  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="8px 20px">
        <Grid container alignItems="center">
          <Grid item sx={{ mr: "10px" }}>
            <IconButton onClick={() => history.goBack()}>
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
                  <img
                    src={`data:image/jpg; base64,${post?.profilePicture}`}
                    alt="profile"
                    style={{width:"80px", borderRadius:"50%"}}
                  />
                </Grid>
                <Grid item flexGrow="1">
                  <Grid container justifyContent="space-between">
                    <Grid item sx={{ marginLeft: "10px" }}>
                      <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                        {post?.author?.name}
                      </Typography>
                      <Typography sx={{ fontSize: "15px", color: "#555" }}>
                        @{post?.author?.handle}
                      </Typography>
                    </Grid>
                    <Grid item>
                      {profile._id === post?.author?.id && (
                        <IconButton
                          aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                          onClick={(event) => setAnchorEl(event.currentTarget)}
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
                        <MenuItem
                          onClick={(event) => {
                            event.preventDefault();
                            handleDeletePost();
                          }}
                        >
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
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Typography sx={{ fontSize: "20px", p: "10px" }}>
                {post.description}
              </Typography>
            </Box>
            <Box display="flex" padding="1rem 0" borderBottom="1px solid #ccc">
              <Typography sx={{ fontSize: "14px", mr: "6px", color: "#555" }}>
                {post?.createdAt && format(new Date(post.createdAt), "HH:mm a")}
              </Typography>
              <Typography sx={{ fontSize: "14px", mr: "6px", color: "#555" }}>
                .
              </Typography>
              <Typography sx={{ fontSize: "14px", mr: "6px", color: "#555" }}>
                {post?.createdAt &&
                  format(new Date(post.createdAt), "MMM dd yyyy")}
              </Typography>
            </Box>
            <Box display="flex" padding="1rem 0" borderBottom="1px solid #ccc">
              <Typography sx={{ fontSize: "14px", mr: "6px", color: "#555" }}>
                <strong>{post?.likes?.length}</strong> Likes
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-around"
              padding=".5rem 0"
              borderBottom="1px solid #ccc"
            >
              <IconButton size="small">
                <SyncIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={handleLikePost} size="small">
                {post?.likes?.includes(profile._id) ? (
                  <FavoriteIcon fontSize="small" />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}
              </IconButton>
              <IconButton size="small">
                <IosShareIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box>
              <Grid container sx={{ mt: "10px" }}>
                <Grid item>
                <img
                    src={`data:image/jpg; base64,${profile.profilePicture}`}
                    alt="profile"
                    style={{width:"80px", borderRadius:"50%"}}
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
                  <Box textAlign="right" paddingBottom=".5rem">
                    <Button
                      sx={{
                        fontSize: "12px",
                        color: "primary",
                        borderRadius: theme.shape.borderRadius,
                      }}
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
                comments.map((comment, index) => (
                  <Comment key={index} comment={comment} post={post} />
                ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
