import React, { useState } from "react";
import {
  useTheme,
  Grid,
  IconButton,
  Box,
  Button,
  Input,
  Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

function UpdateBackgroundImageForm({setBackgroundImage}) {
  const theme = useTheme();
  const [bgImage, setBgImage] = useState(null);

  return (
    <>
      <form enctype="multipart/form-data">
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Grid item>
            <Typography sx={{ mt: "50px", mb:"10px" }}>
              Update Background Image:
            </Typography>
            <Box sx={{ mb: "50px" }}>
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
                name="backgroundImage"
                type="file"
                onChange={(event) => {
                  setBackgroundImage(event.target.files[0]);
                  setBgImage(event.target.files[0]);
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            {bgImage && (
              <Box>
                <IconButton
                  sx={{ bgcolor: "#1976d2" }}
                  onClick={() => setBgImage(null)}
                >
                  <CloseIcon fontSize="small" sx={{ color: theme.palette.primary.main }}/>
                </IconButton>
                <img
                  src={URL.createObjectURL(bgImage)}
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

export default UpdateBackgroundImageForm;
