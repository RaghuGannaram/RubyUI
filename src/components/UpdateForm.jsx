import React,{useState} from 'react';
import {Grid,IconButton, Box,Button, TextField, Input, Typography } from "@mui/material";
import { borderRadius } from '@mui/system';
import {Close as CloseIcon} from "@mui/icons-material";

function UpdateForm({setProfileData}) {
    const [image, setImage] = useState(null);

  return (
        <>
            <form enctype='multipart/form-data'>
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
                    sx={{ width: "100%", margin: "10px 0px", bgcolor: "#fff"}}
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
                <Typography sx={{mb:"10px"}} >Update profile picture : </Typography>
                <Grid container spacing={4} sx={{display:"flex", justifyContent:"space-evenly", alignItems:"center"}}> 
                    <Grid item xs={4}  >
                        <Box>
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" margin="auto" color="primary" component="span" sx={{width:"100%"}}>
                                Upload
                            </Button>
                        </label>
                        <Input
                            id="contained-button-file"
                            style={{ display: "none", margin:"auto" }}
                            name="profilePicture"
                            type="file"
                            onChange={(event) =>{
                                setProfileData((prev) => ({
                                    ...prev,
                                    [event.target.name]: event.target.files[0],
                                }))
                                setImage(event.target.files[0]); 
                            }}
                        />
                        </Box>
                    </Grid>
                    <Grid item xs={4} >
                        {image&&
                            <Box>
                                <IconButton  sx={{bgcolor:"#1976d2"}} onClick={()=>setImage(null)}>
                                    <CloseIcon fontSize="small"/>
                                </IconButton> 
                                <img src={URL.createObjectURL(image)} style={{borderRadius:"10px"}} alt="icon" width="100%" height="100%" />
                            </Box>
                        }
                    </Grid>
                </Grid>
            </form>
        </>
  )
}

export default UpdateForm;
