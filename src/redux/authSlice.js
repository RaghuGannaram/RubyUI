import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  status: "idle",
  user: {},
};

export const registerUser = createAsyncThunk("auth/registerUser", async (userData) => {
  const { data } = await axios.post("/api/auth/register", userData);
  return data;
});

export const loginUser = createAsyncThunk("auth/loginUser", async (userData) => {
  const { data } = await axios.post("/api/auth/login", userData);
  return data;
});


export const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers : {
    setAuth: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    logout: (state, action) => {
      localStorage.clear();
      state.isLoggedIn = false;
      axios.defaults.headers.common["authorization"] = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },

  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.isLoggedIn = true;
      const { username, email, _id } = action.payload;
      localStorage.setItem(
        "login",
        JSON.stringify({ username, email, _id, isLoggedIn: true })
      );
      state.user.username = username;
      state.user.email = email;
      state.user._id = _id;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.isLoggedIn = false;
    },

    [registerUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [registerUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.isLoggedIn = true;
      const {username, email } = action.payload;
      localStorage.setItem(
        "login",
        JSON.stringify({ username, email, isLoggedIn: true })
      );
      state.user.username = username;
      state.user.email = email;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = "failed";
      state.isLoggedIn = false;
    },

   
  },
});

export default authSlice.reducer;
export const { setAuth, logout } = authSlice.actions;
