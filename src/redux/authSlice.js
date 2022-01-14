import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  status: "idle",
  userStatus: "idle",
  profile: {},
  user: {},
  users: [],
};

export const loginUser = createAsyncThunk("auth/loginUser", async (userData) => {
  const { data } = await axios.post("/api/auth/login", userData);
  return data;
});

export const registerUser = createAsyncThunk("auth/registerUser", async (userData) => {
  const { data } = await axios.post("/api/auth/register", userData);
  return data;
});

export const getProfile = createAsyncThunk("auth/getProfile", async (id) => {
  const { data } = await axios.get("/api/profile/" + id);
  return data;
});

export const getUsers = createAsyncThunk("auth/getUsers", async () => {
  const { data } = await axios.get("/api/users/all");
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
      console.log(`auth slice action`, action)
      const { username, email, _id } = action.payload;
      localStorage.setItem(
        "login",
        JSON.stringify({ username, email, _id, isLoggedIn: true })
      );
      state.user.username = username;
      state.user.email = email;
      state.user._id = _id;
      state.status = "success";
      state.isLoggedIn = true;
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
      // console.log(action)
      const {username, email } = action.payload;
      localStorage.setItem(
        "login",
        JSON.stringify({ username, email, isLoggedIn: true })
      );
      state.user.username = username;
      state.user.email = email;
      state.isLoggedIn = true;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = "failed";
      state.isLoggedIn = false;
    },

    [getProfile.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProfile.fulfilled]: (state, action) => {
      state.status = "success";
      state.profile = action.payload.profile;
    },
    [getProfile.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getUsers.pending]: (state, action) => {
      state.userStatus = "loading";
    },
    [getUsers.fulfilled]: (state, action) => {
      state.userStatus = "success";
      console.log(action)
      state.users = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.userStatus = "failed";
    },
  },
});

export default authSlice.reducer;
export const { setAuth, logout } = authSlice.actions;
