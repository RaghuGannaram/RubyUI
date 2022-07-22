import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status : "idle",
  user: {},
  users: [],
  followers: [],
  followings: [],
};

export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  const { data } = await axios.get("/api/users/all");
  return data;
});

export const getUserDetails = createAsyncThunk("user/getUserDetails", async (userId) => {
  const { data } = await axios.get(`/api/users/${userId}`);
  return data;
});

export const updateUser = createAsyncThunk("user/updateUser", async (updateData) => {
  const formData = new FormData();
  formData.append('userId',updateData.userId)
  formData.append('handle',updateData.data.handle)
  formData.append('description',updateData.data.description)
  formData.append('city',updateData.data.city)
  formData.append('from',updateData.data.from)
  formData.append('profilePicture',updateData.data.profilePicture)
  const { data } = await axios.put(`/api/users/${updateData.userId}`, formData);
  return data;
});

export const updateBackgroundImage = createAsyncThunk("user/updateBackgrounImage", async (updateData) => {
  const formData = new FormData();
  formData.append('userId',updateData.userId)
  formData.append('backgroundImage',updateData.data)
  const { data } = await axios.put(`/api/users/${updateData.userId}/backgroundImage`, formData);
  return data;
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (userData) => {
  const { data } = await axios.delete(`/api/users/${userData.userId}`, userData);
  return data;
});

export const followUser = createAsyncThunk("user/followUser", async (followData) => {
  const {data} = await axios.put(`/api/users/${followData.followerId}/follow`, followData);
  return data;
})



export const userSlice = createSlice({

  name: "user",

  initialState,

  reducers: { },

  extraReducers: {
    [getAllUsers.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getUserDetails.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUserDetails.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = action.payload;
      state.followers = action.payload.followers;
      state.follwings = action.payload.followings;
    },
    [getUserDetails.rejected]: (state, action) => {
      state.status = "failed";
    },

    [updateUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateUser.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [updateUser.rejected]: (state, action) => {
      state.status = "failed";
    },

    [updateBackgroundImage.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateBackgroundImage.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [updateBackgroundImage.rejected]: (state, action) => {
      state.status = "failed";
    },

    [deleteUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = action.payload;
    },
    [deleteUser.rejected]: (state, action) => {
      state.status = "failed";
    },

    [followUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [followUser.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [followUser.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default userSlice.reducer;
// export const {  } = userSlice.actions;
