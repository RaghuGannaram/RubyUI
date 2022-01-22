import React, {useState} from "react";
import { Grid, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import {
  MoreHoriz as MoreHorizIcon, 
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import {useDispatch} from "react-redux";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {getComments, deleteComment, likeSpecificComment} from "../Redux/postSlice";

export default function Comment({ comment, post }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const {_id} =JSON.parse(localStorage.getItem("login"));

  const handleLikeAComment = async () => {
    const likeCommentData = {
      userId : _id,
      postId : post._id,
      commentId : comment._id
    }
    await dispatch(likeSpecificComment(likeCommentData));
    await dispatch(getComments(post._id));
  }

  const handleDeleteComment = async (event) => {
    event.preventDefault();
    const commentData = {
      postId : post._id,
      commentId : comment._id
    }
    await dispatch(deleteComment(commentData));
    await dispatch(getComments(post._id));
  }

  return (
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
          <img src="/icon.png" alt="icon" width="50px" />
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
                    {comment?.author?.name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                  >
                    @{comment?.author?.handle}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "15px", color: "#555" }}>
                    {comment?.description}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                {console.log(comment)}
                {comment?.author?.id === _id && (
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
                  onClose={()=>setAnchorEl(null)}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={(event) => handleDeleteComment(event)}
                  >
                    Delete Comment
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginRight="5rem"
                marginTop=".8rem"
            >
              <Typography sx={{ fontSize: "15px", mr: "6px", color: "#555" }} >
                {comment?.date && formatDistanceToNow(new Date(comment?.date))}
              </Typography>
              <IconButton 
                size="small"
                onClick={handleLikeAComment}
              >
                {comment?.likes?.includes(_id) ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" /> }
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
