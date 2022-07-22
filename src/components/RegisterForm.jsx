import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  useTheme,
  Typography,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { registerUser } from "../Redux/authSlice";

export default function RegisterForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { status, isLoggedIn } = useSelector((state) => state.auth);
  const [registerData, setRegisterData] = useState({});
  const [err, setErr] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(registerData));
  };

  useEffect(() => {
    isLoggedIn && history.push("/");
  }, [history, isLoggedIn]);

  useEffect(() => {
    if (status === "failed") {
      setErr(true);
      setRegisterData({});
    }
    setTimeout(() => {
      setErr(false);
    }, 3000);
  }, [status]);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Enter full name"
        name="username"
        type="text"
        required
        onChange={(event) =>
          setRegisterData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
          }))
        }
      />
      <TextField
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Choose an handle"
        name="handle"
        type="text"
        required
        onChange={(event) =>
          setRegisterData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
          }))
        }
      />
      <TextField
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Enter Email"
        name="email"
        type="email"
        required
        onChange={(event) =>
          setRegisterData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
          }))
        }
      />
      <TextField
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Enter Password"
        name="password"
        type="password"
        required
        onChange={(event) =>
          setRegisterData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
          }))
        }
      />

      {err && (
        <Typography sx={{ color: theme.palette.error.main }}>
          Registration failed, Kindly try with different email and username...
        </Typography>
      )}
      <Button
        sx={{
          width: "100%",
          margin: "1.5rem 0",
          padding: "12px 0",
          borderRadius: "28px",
          color: "primary",
        }}
        variant="contained"
        type="submit"
      >
        {status === "loading" ? (
          <CircularProgress size={24} sx={{ color: "#FFF" }} />
        ) : (
          "Register"
        )}
      </Button>
    </form>
  );
}
