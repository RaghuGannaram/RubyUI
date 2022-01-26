import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Button,
  Grid,
  Hidden,
  IconButton,
  Input,
  Menu,
  MenuItem,
  useTheme,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import {
  Home as HomeIcon,
  Tag as TagIcon,
  NotificationsNone as NotificationsNoneIcon,
  MailOutline as MailOutlineIcon,
  Bookmark as BookmarkIcon,
  ListAlt as ListAltIcon,
  Logout as LogoutIcon,
  Close as CloseIcon,
  PersonOutline as PersonOutlineIcon,
  MoreHoriz as MoreHorizIcon,
  AddCircleOutline as AddCircleOutlineIcon,
} from "@mui/icons-material";
import { logoutUser } from "../Redux/authSlice";
import Modal from "./Modal";
import { getAllPosts, addNewPost } from "../Redux/postSlice";

export default function LeftSidebar() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [postText, setPostText] = useState("");
  const dispatch = useDispatch();
  
  const open = Boolean(anchorEl);
  const { _id } = JSON.parse(localStorage.getItem("login"));
 
 
  const handleAddPost = async () => {
    await dispatch(addNewPost({ text: postText }));
    await dispatch(getAllPosts());
    setPostText("");
  };

  return (
    <>
      <Box sx={{ height: "100vh", maxWidth: "100%" ,backgroundColor:"inherit"}}>
        <Box textAlign="center" paddingTop={2}>
          <NavLink
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <img src="/icon.png" alt="icon" width="50px" />
          </NavLink>
        </Box>
        <List>
          <NavLink
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <HomeIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                    color: theme.palette.action.active,
                  }}
                  primary="Home"
                />
              </Hidden>
            </ListItem>
          </NavLink>

          <ListItem
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
            }}
          >
            <ListItemIcon>
              <TagIcon fontSize="medium" color="action" />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: theme.palette.action.active,
                }}
                primary="Explore"
              />
            </Hidden>
          </ListItem>
          <ListItem
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
            }}
          >
            <ListItemIcon>
              <NotificationsNoneIcon fontSize="medium" color="action" />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: theme.palette.action.active,
                }}
                primary="Notifications"
              />
            </Hidden>
          </ListItem>
          <ListItem
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
            }}
          >
            <ListItemIcon>
              <MailOutlineIcon fontSize="medium" color="action" />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: theme.palette.action.active,
                }}
                primary="Messages"
              />
            </Hidden>
          </ListItem>
          <ListItem
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
            }}
          >
            <ListItemIcon>
              <BookmarkIcon fontSize="medium" color="action" />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: theme.palette.action.active,
                }}
                primary="Bookmarks"
              />
            </Hidden>
          </ListItem>
          <ListItem
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
            }}
          >
            <ListItemIcon>
              <ListAltIcon fontSize="medium" color="action" />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: theme.palette.action.active,
                }}
                primary="Lists"
              />
            </Hidden>
          </ListItem>
          <NavLink
            to={`/profile/${_id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <PersonOutlineIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                    color: theme.palette.action.active,
                  }}
                  primary="Profile"
                />
              </Hidden>
            </ListItem>
          </NavLink>
          <ListItem
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(event)=>{setAnchorEl(event.currentTarget)}}
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
            }}
          >
            <ListItemIcon>
              <MoreHorizIcon fontSize="medium" color="action" />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: theme.palette.action.active,
                }}
                primary="More"
              />
            </Hidden>
          </ListItem>
        </List>
        <Hidden lgDown>
          <Button
            onClick={()=>setOpenModal(true)}
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
            onClick={()=>setOpenModal(true)}
            variant="contained"
            color="primary"
            style={{
              borderRadius: "28px",
              padding: "0 15px",
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Hidden>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={()=>{setAnchorEl(null)}}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() =>dispatch(logoutUser())}>
            Logout 
            <IconButton >
              <LogoutIcon fontSize="small"/>
            </IconButton> 
          </MenuItem>
          <MenuItem onClick={()=>setAnchorEl(null)}>
            Close
            <IconButton >
              <CloseIcon fontSize="small"/>
            </IconButton> 
          </MenuItem>
        </Menu>
      </Box>
      <Modal
        open={openModal}
        handleClose={()=>setOpenModal(false)}
        button={"Post"}
        text={postText.length}
        handleSubmit={handleAddPost}
      >
        <Box>
          <Grid container>
            <Grid item>
              <img src="/icon.png" alt="icon" width="60px" />
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
                  sx={{ width: "100%" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
