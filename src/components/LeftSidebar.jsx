import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Box,
  useTheme,
  Hidden,
  IconButton,
  Button,
  Input,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Home as HomeIcon,
  Tag as TagIcon,
  NotificationsNone as NotificationsNoneIcon,
  MailOutline as MailOutlineIcon,
  Bookmark as BookmarkIcon,
  ListAlt as ListAltIcon,
  PersonOutline as PersonOutlineIcon,
  MoreHoriz as MoreHorizIcon,
  Logout as LogoutIcon,
  Close as CloseIcon,
  AddCircleOutline as AddCircleOutlineIcon,
} from "@mui/icons-material";
import { logoutUser } from "../Redux/authSlice";
import { getAllPosts, addNewPost } from "../Redux/postSlice";
import Modal from "./Modal";

export default function LeftSidebar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const [postText, setPostText] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleAddPost = async () => {
    await dispatch(addNewPost({ text: postText }));
    await dispatch(getAllPosts());
    setPostText("");
  };

  return (
    <>
      <Box sx={{ height: "100vh", maxWidth: "100%" }}>
        <Box sx={{ textAlign: "center", pt: "2rem" }}>
          <NavLink to="/">
            <img src="/logo.png" alt="logo" width="50px" />
            <Typography
              sx={{
                color: theme.palette.secondary.main,
                fontSize: "20px",
                fontFamily: "sans-serif",
                fontWeight: "bold",
              }}
            >
              RubyNet
            </Typography>
          </NavLink>
        </Box>
        <List>
          <NavLink to="/">
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
                "&:hover": {
                  backgroundColor: theme.palette.background.dark,
                },
              }}
            >
              <ListItemIcon>
                <HomeIcon
                  fontSize="medium"
                  sx={{ color: theme.palette.primary.main }}
                />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primary="Home"
                  primaryTypographyProps={{
                    fontSize: "18px",
                    color: theme.palette.secondary.main,
                  }}
                />
              </Hidden>
            </ListItem>
          </NavLink>

          <ListItem
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
              "&:hover": {
                backgroundColor: theme.palette.background.dark,
              },
            }}
          >
            <ListItemIcon>
              <TagIcon
                fontSize="medium"
                sx={{ color: theme.palette.primary.main }}
              />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primary="Explore"
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: theme.palette.secondary.main,
                }}
              />
            </Hidden>
          </ListItem>

          <ListItem
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
              "&:hover": {
                backgroundColor: theme.palette.background.dark,
              },
            }}
          >
            <ListItemIcon>
              <NotificationsNoneIcon
                fontSize="medium"
                sx={{ color: theme.palette.primary.main }}
              />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primary="Notifications"
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: theme.palette.secondary.main,
                }}
              />
            </Hidden>
          </ListItem>

          <ListItem
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
              "&:hover": {
                backgroundColor: theme.palette.background.dark,
              },
            }}
          >
            <ListItemIcon>
              <MailOutlineIcon
                fontSize="medium"
                sx={{ color: theme.palette.primary.main }}
              />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primary="Messages"
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: theme.palette.secondary.main,
                }}
              />
            </Hidden>
          </ListItem>

          <ListItem
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
              "&:hover": {
                backgroundColor: theme.palette.background.dark,
              },
            }}
          >
            <ListItemIcon>
              <BookmarkIcon
                fontSize="medium"
                sx={{ color: theme.palette.primary.main }}
              />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primary="Bookmarks"
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: theme.palette.secondary.main,
                }}
              />
            </Hidden>
          </ListItem>

          <ListItem
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
              "&:hover": {
                backgroundColor: theme.palette.background.dark,
              },
            }}
          >
            <ListItemIcon>
              <ListAltIcon
                fontSize="medium"
                sx={{ color: theme.palette.primary.main }}
              />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primary="Lists"
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: theme.palette.secondary.main,
                }}
              />
            </Hidden>
          </ListItem>

          <NavLink to={`/profile/${profile._id}`}>
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
                "&:hover": {
                  backgroundColor: theme.palette.background.dark,
                },
              }}
            >
              <ListItemIcon>
                <PersonOutlineIcon
                  fontSize="medium"
                  sx={{ color: theme.palette.primary.main }}
                />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primary="Profile"
                  primaryTypographyProps={{
                    fontSize: "18px",
                    color: theme.palette.secondary.main,
                  }}
                />
              </Hidden>
            </ListItem>
          </NavLink>
          <ListItem
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
              "&:hover": {
                backgroundColor: theme.palette.background.dark,
              },
            }}
          >
            <ListItemIcon>
              <MoreHorizIcon
                fontSize="medium"
                sx={{ color: theme.palette.primary.main }}
              />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: theme.palette.secondary.main,
                }}
                primary="More"
              />
            </Hidden>
          </ListItem>
        </List>
        <Hidden lgDown>
          <Button
            onClick={() => setOpenModal(true)}
            variant="contained"
            color="primary"
            fullWidth
            style={{
              borderRadius: "28px",
              padding: "10px",
              textTransform: "capitalize",
            }}
          >
            Post
          </Button>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            onClick={() => setOpenModal(true)}
            variant="contained"
            color="primary"
            style={{
              borderRadius: "28px",
              padding: "0 15px",
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            <AddCircleOutlineIcon sx={{ color: theme.palette.primary.main }} />
          </IconButton>
        </Hidden>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => {
            setAnchorEl(null);
          }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => dispatch(logoutUser())}>
            Logout
            <IconButton>
              <LogoutIcon
                fontSize="small"
                sx={{ color: theme.palette.primary.main }}
              />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>
            Close
            <IconButton>
              <CloseIcon
                fontSize="small"
                sx={{ color: theme.palette.primary.main }}
              />
            </IconButton>
          </MenuItem>
        </Menu>
      </Box>
      <Modal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        button={"Post"}
        text={postText.length}
        handleSubmit={handleAddPost}
      >
        <Box>
          <Grid container>
            <Grid item>
              <img
                src={`data:image/jpg; base64,${profile.profilePicture}`}
                alt="profile"
                style={{ width: "80px", borderRadius: "50%" }}
              />
            </Grid>
            <Grid item flexGrow="1">
              <Box padding=".5rem">
                <Input
                  value={postText}
                  onChange={(event) => setPostText(event.target.value)}
                  multiline
                  rows="2"
                  disableUnderline
                  type="text"
                  placeholder="What's happening?"
                  sx={{ width: "100%", color: theme.palette.secondary.main }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
