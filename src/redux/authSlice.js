import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  status: "idle",
  profile: {},
};

export const registerUser = createAsyncThunk("auth/registerUser", async (signUpData) => {
  const { data } = await axios.post("/api/auth/register", signUpData);
  return data;
});

export const loginUser = createAsyncThunk("auth/loginUser", async (signInData) => {
  const { data } = await axios.post("/api/auth/login", signInData);
  return data;
});


export const authSlice = createSlice({

  name: "auth",

  initialState,

  reducers : {
    setAuthStatus: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.profile = JSON.parse(localStorage.getItem("rubyNet")).profile;
    },
    logoutUser: (state, action) => {
      localStorage.clear();
      state.isLoggedIn = false;
      state.profile={};
      // axios.defaults.headers.common["authorization"] = null;
    }
  },

  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.status = "success";
      state.profile = action.payload;
      localStorage.setItem("rubyNet", JSON.stringify({isLoggedIn: true, profile: {...action.payload}}));
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
      state.profile = action.payload;
      localStorage.setItem("rubyNet", JSON.stringify({isLoggedIn: true, profile: {...action.payload}}));
    },
    [registerUser.rejected]: (state, action) => {
      state.status = "failed";
      state.isLoggedIn = false;
    },

  },
});

export default authSlice.reducer;
export const { setAuthStatus, logoutUser } = authSlice.actions;
