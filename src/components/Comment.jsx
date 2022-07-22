import React, {useState} from "react";
import { Grid, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import {
  MoreHoriz as MoreHorizIcon, 
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import { useSelector, useDispatch} from "react-redux";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {getComments, deleteComment, likeSpecificComment} from "../Redux/postSlice";
import theme from "../Theme/customTheme";

export default function Comment({ comment, post }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const { profile } = useSelector((state) => state.auth);

  const handleLikeAComment = async () => {
    const likeCommentData = {
      userId : profile._id,
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
          backgroundColor: theme.palette.background.light,
        },
      }}
    >
      <Grid container flexWrap="nowrap">
        <Grid item sx={{ paddingRight: "1rem" }}>
        <img
            src={`data:image/jpg; base64,${profile?.profilePicture}`}
            alt="profile"
            style={{width:"80px", borderRadius:"50%"}}
          />
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
                {comment?.author?.id === profile._id && (
                  <IconButton
                    aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      setAnchorEl(event.currentTarget);
                    }}
                  >
                    <MoreHorizIcon sx={{ color: theme.palette.primary.main }}/>
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
                {comment?.likes?.includes(profile._id) ? <FavoriteIcon fontSize="small" sx={{ color: theme.palette.primary.main }}/> : <FavoriteBorderIcon fontSize="small" sx={{ color: theme.palette.primary.main }}/> }
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
