import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Input, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Search } from "@mui/icons-material";
import WhoToFollow from "./WhoToFollow";
import { getAllUsers } from "../Redux/userSlice";

export default function RightSidebar() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { users, status } = useSelector((state) => state.user);
  const [query, setQuery] = useState("");

  function queriedUsers() {
    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.handle.toLowerCase().includes(query.toLowerCase())
    );
  }

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <Box sx={{ width: "100%", overflow:"hidden" }}>
      <Box paddingTop="10px">
        <Box
          width="100%"
          borderRadius="28px"
          border="1px solid #eee"
          position="relative"
          sx={{
            background: "#eee",
          }}
        >
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            inputProps={{
              style: { padding: "10px" },
            }}
            disableUnderline
            fullWidth
            placeholder="Search"
            startAdornment={
              <Search
                sx={{
                  paddingLeft: "20px",
                  color: "#777",
                }}
              />
            }
          />
          {query.length !== 0 && (
            <Box
              width="100%"
              sx={{
                backgroundColor: "white",
                border: "1px solid #eee",
                borderRadius: "28px",
                padding: "1rem 0",
                zIndex: "999",
                maxHeight: "50vh",
                overflowY: "scroll",
              }}
              position="absolute"
            >
              {query.length !== 0 && queriedUsers().length === 0 && (
                <Typography sx={{ padding: "0 1rem" }}>
                  No users found!
                </Typography>
              )}
              {queriedUsers().map((user, index) => (
                <Box key={index}>
                  <Link
                    onClick={() => setQuery("")}
                    style={{ textDecoration: "none" }}
                    to={`/profile/${user._id}`}
                  >
                    <Grid
                      sx={{
                        overflow: "hidden",
                        padding: ".2rem 1rem",
                        "&:hover": {
                          backgroundColor: "#eee",
                        },
                      }}
                      container
                      alignItems="center"
                    >
                      <Grid item sx={{ paddingRight: "12px" }}>
                        <img
                          src={`data:image/jpg; base64,${user?.profilePicture}`}
                          alt="profilPicture"
                          style={{width:"80px", borderRadius:"50%"}}
                        />
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center">
                          <Grid item>
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: "500",
                                color: "#000",
                              }}
                            >
                              {user.username}
                            </Typography>
                            <Box display="flex" alignItems="center">
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  mr: "6px",
                                  color: "#555",
                                }}
                              >
                                @{user.handle}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Link>
                </Box>
              ))}
            </Box>
          )}
        </Box>
        <Box
          sx={{
            background: "#eee",
            borderRadius: "28px",
            padding: "10px 20px",
            margin: "1rem 0",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", textAlign:"center" }}>
            Who to follow
          </Typography>
          {status === "success" &&
            users
              .filter((user) => user._id !== profile._id)
              .sort((a,b)=>{
                return b.followers.length-a.followers.length
              })
              .slice(0, 3)
              .map((item, index) => <WhoToFollow key={index} user={item} />)}
        </Box>
      </Box>
    </Box>
  );
}
