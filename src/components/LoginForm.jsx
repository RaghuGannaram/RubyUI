import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  useTheme,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { loginUser } from "../Redux/authSlice";

export default function LoginForm() {
  const history = useHistory();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { status, isLoggedIn } = useSelector((state) => state.auth);
  const [logInData, setLogInData] = useState({});
  const [err, setErr] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(logInData));
  };

  const loginAsGuest = () => {
    setLogInData({ email: "johndoe@mail.com", password: "johndoe" });
    dispatch(loginUser(logInData));
  };

  useEffect(() => {
    isLoggedIn && history.push("/");
  }, [history, isLoggedIn]);

  useEffect(() => {
    if (status === "failed") {
      setErr(true);
      setLogInData({ email: null, password: null });
    }
    setTimeout(() => {
      setErr(false);
    }, 3000);
  }, [status]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
          variant="outlined"
          label="Enter Email"
          name="email"
          type="email"
          required
          onChange={(event) =>
            setLogInData((prev) => ({
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
            setLogInData((prev) => ({
              ...prev,
              [event.target.name]: event.target.value,
            }))
          }
        />

        {err && (
          <Typography sx={{ color: theme.palette.error.main }}>
            Invalid Credentials, Unable to login...
          </Typography>
        )}
        <Button
          sx={{
            color: "primary",
            width: "100%",
            margin: "1.5rem 0",
            padding: "12px 0",
            borderRadius: "28px",
          }}
          variant="contained"
          type="default"
        >
          {status === "loading" ? (
            <CircularProgress size={24} sx={{ color: "#FFF" }} />
          ) : (
            "Login"
          )}
        </Button>
      </form>
      <Button
        sx={{
          color: "primary",
          width: "100%",
          margin: "1.5rem 0",
          padding: "12px 0",
          borderRadius: "28px",
        }}
        variant="outlined"
        onClick={loginAsGuest}
      >
        {status === "loading" ? "Logging in..." : "Login as guest"}
      </Button>
    </>
  );
}
