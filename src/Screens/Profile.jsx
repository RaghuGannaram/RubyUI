import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  useTheme,
  Menu,
  MenuItem
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  MoreHoriz as MoreHorizIcon,
  MailOutline as MailOutlineIcon,
  Close as CloseIcon,
  Autorenew as AutorenewIcon,
  LocationOn as LocationOnIcon,
  DateRange as DateRangeIcon,
} from "@mui/icons-material/";
import { Box } from "@mui/system";
import format from "date-fns/format";
import Post from "../Components/Post";
import Modal from "../Components/Modal";
import UpdateForm from "../Components/UpdateForm";
import { getUserDetails,followUser, updateUser } from "../Redux/userSlice";
import { getUserPosts } from "../Redux/postSlice";

export default function Profile() {

  const theme = useTheme();
  const { userId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const {user, status, followers, followings } = useSelector((state) => state.user);
  const { postStatus, posts } = useSelector((state) => state.post);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] =useState(false);
  const [profileData, setProfileData] = useState({});

  
  const { _id } = JSON.parse(localStorage.getItem("login"));

  useEffect( () =>  {
    dispatch(getUserDetails(userId));
    dispatch(getUserPosts(userId));
  }, [dispatch, userId]);

  const handleFollow = async () => {
    const followData = {
      followerId : _id,
      userId : userId
    }
    await dispatch(followUser(followData));
    await dispatch(getUserDetails(userId));
  };

  const handleUpdateUser = async () => {
    const updateData = {
      userId: _id,
      data: profileData
    }
    await dispatch(updateUser(updateData));
    await dispatch(getUserDetails(_id)); 
  }

  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="8px 20px">
        <Grid container alignItems="center">
          <Grid item sx={{ mr: "10px" }}>
            <IconButton onClick={()=>history.goBack()}>
              <ArrowBackIcon />
            </IconButton>
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
            {userId === _id && (
                <IconButton
                  aria-expanded={ Boolean(anchorEl) ? "true" : undefined}
                  onClick={(event) => setAnchorEl(event.currentTarget)}
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
                onClick={(event) => {
                  event.preventDefault();
                  setOpenModal(true);
                  setAnchorEl(null)
                }}
              >
                Update Info
                <IconButton >
                  <AutorenewIcon fontSize="small"/>
                </IconButton>
              </MenuItem>
              <MenuItem onClick={()=>setAnchorEl(null)}>
                Close Menu
                <IconButton >
                  <CloseIcon fontSize="small"/>
                </IconButton> 
              </MenuItem>
            </Menu>
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
    <Modal
      open={openModal}
      handleClose={()=>setOpenModal(false)}
      button={"Update"}
      handleSubmit={handleUpdateUser}
    >
        <UpdateForm setProfileData ={setProfileData}/>
    </Modal>
    </Box>
  );
}
