import React, { useState } from "react";
import {
  Grid,
  IconButton,
  Box,
  Button,
  TextField,
  Input,
  Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

function UpdateForm({ setProfileData }) {
  const [profilePicture, setProfilePicture] = useState(null);

  return (
    <>
      <form enctype="multipart/form-data">
        <TextField
          sx={{ width: "100%", margin: "10px 0px", bgcolor: "#fff" }}
          variant="outlined"
          label="Handle"
          name="handle"
          type="text"
          onChange={(event) =>
            setProfileData((prev) => ({
              ...prev,
              [event.target.name]: event.target.value,
            }))
          }
        />

        <TextField
          sx={{ width: "100%", margin: "10px 0px", bgcolor: "#fff" }}
          variant="outlined"
          label="Description"
          name="description"
          type="text"
          multiline
          rows={1}
          onChange={(event) =>
            setProfileData((prev) => ({
              ...prev,
              [event.target.name]: event.target.value,
            }))
          }
        />

        <TextField
          sx={{ width: "100%", margin: "10px 0px", bgcolor: "#fff" }}
          variant="outlined"
          label="Current Location"
          name="city"
          type="text"
          onChange={(event) =>
            setProfileData((prev) => ({
              ...prev,
              [event.target.name]: event.target.value,
            }))
          }
        />

        <TextField
          sx={{ width: "100%", margin: "10px 0px", bgcolor: "#fff" }}
          variant="outlined"
          label="Native Location"
          name="from"
          type="text"
          onChange={(event) =>
            setProfileData((prev) => ({
              ...prev,
              [event.target.name]: event.target.value,
            }))
          }
        />
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Grid item >
              <Typography sx={{mt:"50px"}}>Update profile picture : </Typography>
              <Box sx={{margin:"10px auto"}}>
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    margin="auto"
                    color="primary"
                    component="span"
                    sx={{ width: "100%" }}
                  >
                    Upload
                  </Button>
                </label>
                <Input
                  id="contained-button-file"
                  style={{ display: "none", margin: "auto" }}
                  name="profilePicture"
                  type="file"
                  onChange={(event) => {
                    setProfileData((prev) => ({
                      ...prev,
                      [event.target.name]: event.target.files[0],
                    }));
                    setProfilePicture(event.target.files[0]);
                  }}
                />
              </Box>
          </Grid>
          <Grid item xs={4}>
            {profilePicture && (
              <Box>
                <IconButton
                  sx={{ bgcolor: "#1976d2" }}
                  onClick={() => setProfilePicture(null)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
                <img
                  src={URL.createObjectURL(profilePicture)}
                  style={{ borderRadius: "10px" }}
                  alt="icon"
                  width="100%"
                  height="100%"
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default UpdateForm;
