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
  MenuItem,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  MoreHoriz as MoreHorizIcon,
  MailOutline as MailOutlineIcon,
  Close as CloseIcon,
  Autorenew as AutorenewIcon,
  LocationOn as LocationOnIcon,
  Home as HomeIcon,
  DateRange as DateRangeIcon,
  EditOutlined as EditOutlinedIcon,
} from "@mui/icons-material/";
import { Box } from "@mui/system";
import format from "date-fns/format";
import Post from "../Components/Post";
import Modal from "../Components/Modal";
import UpdateForm from "../Components/UpdateForm";
import UpdateBackgroundImageForm from "../Components/UpdateBackgroundImageForm";
// import {getProfileDetails} from "../Redux/authSlice";
import {
  getUserDetails,
  followUser,
  updateUser,
  updateBackgroundImage,
} from "../Redux/userSlice";
import { getUserPosts } from "../Redux/postSlice";

export default function Profile() {
  const theme = useTheme();
  const { userId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { user, status, followers, followings } = useSelector(
    (state) => state.user
  );
  const { postStatus, posts } = useSelector((state) => state.post);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openBGIModal, setOpenBGIModal] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [backgroundImage, setBackgroundImage] = useState({});

  useEffect(() => {
    dispatch(getUserDetails(userId));
    dispatch(getUserPosts(userId));
  }, [dispatch, userId]);

  const handleFollow = async () => {
    const followData = {
      followerId: profile._id,
      userId: userId,
    };
    await dispatch(followUser(followData));
    await dispatch(getUserDetails(userId));
  };

  const handleUpdateUser = async () => {
    const updateData = {
      userId: profile._id,
      data: profileData,
    };
    await dispatch(updateUser(updateData));
    await dispatch(getUserDetails(profile._id));
  };

  const handleBackgroundImageUpdate = async () => {
    const updateData = {
      userId: profile._id,
      data: backgroundImage,
    };
    await dispatch(updateBackgroundImage(updateData));
    await dispatch(getUserDetails(profile._id));
  };

  return (
    <Box sx={{ color: theme.palette.secondary.main }}>
      <Box
        sx={{
          borderBottom: `1px solid ${theme.palette.background.dark}`,
          padding: "8px 20px",
        }}
      >
        <Grid container alignItems="center">
          <Grid item sx={{ mr: "10px" }}>
            <IconButton onClick={() => history.goBack()}>
              <ArrowBackIcon sx={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Grid>

          {status === "success" && (
            <Grid item>
              <Typography variant="h6">{user?.username}</Typography>
              <Typography sx={{ fontSize: "12px" }}>
                {user?.posts?.length} posts
              </Typography>{" "}
            </Grid>
          )}
        </Grid>
      </Box>
      <Box textAlign="center">
        {status === "loading" && <CircularProgress size={20} />}
      </Box>
      {status === "success" && (
        <Box height="90vh" sx={{ overflowY: "scroll" }} className="scrollhost">
          <Box>
            <img
              src={`data:image/jpg; base64,${user?.backgroundImage}`}
              alt="background"
              style={{ width: "100%" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ padding: "10px" }}>
              <img
                src={`data:image/jpg; base64,${user?.profilePicture}`}
                alt="profile"
                style={{ width: "80px", borderRadius: "50%" }}
              />
            </Box>
            <Box textAlign="right" padding="10px">
              {userId === profile._id && (
                <IconButton
                  aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                >
                  <MoreHorizIcon sx={{ color: theme.palette.primary.main }} />
                </IconButton>
              )}

              {userId === profile._id && (
                <IconButton
                  title="Update Background Image"
                  onClick={(event) => {
                    event.preventDefault();
                    setOpenBGIModal(true);
                  }}
                >
                  <EditOutlinedIcon
                    sx={{ color: theme.palette.primary.main }}
                  />
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
                    setOpenModal(true);
                    setAnchorEl(null);
                  }}
                >
                  Update Info
                  <IconButton>
                    <AutorenewIcon
                      fontSize="small"
                      sx={{ color: theme.palette.primary.main }}
                    />
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
                    <CloseIcon
                      fontSize="small"
                      sx={{ color: theme.palette.primary.main }}
                    />
                  </IconButton>
                </MenuItem>
              </Menu>
              <IconButton>
                <MailOutlineIcon sx={{ color: theme.palette.primary.main }} />
              </IconButton>
              {userId !== profile._id && (
                <Button
                  onClick={handleFollow}
                  sx={{
                    textTransform: "capitalize",
                    padding: "6px 20px",
                    borderRadius: theme.shape.borderRadius,
                  }}
                  variant="contained"
                  size="small"
                >
                  {followers.includes(profile._id) ? "Unfollow" : "Follow"}
                </Button>
              )}
            </Box>
          </Box>
          <Box padding="10px 20px">
            <Typography variant="h6" sx={{ fontWeight: "500" }}>
              {user?.username}
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>@{user?.handle}</Typography>
            <Typography fontSize="16px" padding="10px 0">
              {user?.description}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              padding="6px 0"
              flexWrap="wrap"
            >
              <Box display="flex">
                <LocationOnIcon sx={{ color: theme.palette.primary.main }} />
                <Typography sx={{ ml: "6px" }}>{user?.city}</Typography>
              </Box>

              <Box display="flex" marginLeft="1rem">
                <HomeIcon sx={{ color: theme.palette.primary.main }} />
                <Typography sx={{ ml: "6px" }}>{user?.from}</Typography>
              </Box>

              <Box display="flex" marginLeft="1rem">
                <DateRangeIcon sx={{ color: theme.palette.primary.main }} />
                <Typography sx={{ ml: "6px" }}>
                  {user &&
                    user.createdAt &&
                    format(new Date(user.createdAt), "MMM dd yyyy")}
                </Typography>
              </Box>
            </Box>
            <Box display="flex">
              <Typography marginRight="1rem">
                <strong style={{ marginRight: "5px" }}>
                  {followings.length}
                </strong>
                Following
              </Typography>
              <Typography marginRight="1rem">
                <strong style={{ marginRight: "5px" }}>
                  {followers.length}
                </strong>
                Followers
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{ borderBottom: `1px solid ${theme.palette.background.dark}` }}
          >
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
            {postStatus === "loading" && <CircularProgress size={20} />}
          </Box>
          {postStatus === "success" &&
            posts.map((post) => <Post key={post._id} post={post} />)}
        </Box>
      )}
      <Modal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        button={"Update"}
        handleSubmit={handleUpdateUser}
      >
        <UpdateForm setProfileData={setProfileData} />
      </Modal>

      <Modal
        open={openBGIModal}
        handleClose={() => setOpenBGIModal(false)}
        button={"Update"}
        handleSubmit={handleBackgroundImageUpdate}
      >
        <UpdateBackgroundImageForm setBackgroundImage={setBackgroundImage} />
      </Modal>
    </Box>
  );
}
