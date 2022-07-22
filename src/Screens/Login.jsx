import React, { useState } from "react";
import { Box, Typography, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";

export default function Login() {
  const theme = useTheme();
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        borderRadius={theme.shape.borderRadius}
        sx={{
          width: theme.breakpoints.values.sm,
          bgcolor: "#EFF3F4",
          padding: " 3rem 2rem",
        }}
      >
        <Box textAlign="center" marginBottom="1rem">
          <img src="/logo.png" width={100} height={100} alt="icon" />
        </Box>
        {isLoginForm ? (
          <Typography variant="h5">Login to your account</Typography>
        ) : (
          <Typography variant="h5">Create a new account</Typography>
        )}
        {isLoginForm ? <LoginForm /> : <RegisterForm />}
        {isLoginForm ? (
          <Box textAlign="center" margin=".5rem 0">
            Don't have an account?{" "}
            <Link onClick={() => setIsLoginForm(false)}>Create one</Link>
          </Box>
        ) : (
          <Box textAlign="center" margin=".5rem 0">
            Already registered?{" "}
            <Link onClick={() => setIsLoginForm(true)}>Sign in</Link>
          </Box>
        )}
      </Box>
    </Box>
  );
}
