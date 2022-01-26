import React from 'react';
import { TextField } from "@mui/material";

function UpdateForm({setProfileData}) {

  return (
        <>
            <form>
                <TextField
                    sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
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
                    sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
                    variant="outlined"
                    label="Description"
                    name="description"
                    type="text"
                    multiline
                    rows={3}
                    onChange={(event) =>
                        setProfileData((prev) => ({
                        ...prev,
                        [event.target.name]: event.target.value,
                        }))
                    }
                />

                <TextField
                    sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
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
                    sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
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

                <TextField
                    sx={{ width: "40%", margin: "1rem 0", bgcolor: "#fff" }}
                    variant="outlined"
                    label="Native Location"
                    name="from"
                    type="file"
                    onChange={(event) =>
                        setProfileData((prev) => ({
                        ...prev,
                        [event.target.name]: event.target.value,
                        }))
                    }
                />
            </form>
        </>
  )
}

export default UpdateForm;
