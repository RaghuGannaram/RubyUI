import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  post: {},
  posts: [],
  comments: [],
};

export const getAllPosts = createAsyncThunk("post/getPosts", async () => {
  const { data } = await axios.get("/api/posts/all");
  return data;
});

export const getTimelinePosts = createAsyncThunk("post/getTimelinePosts", async (userId) => {
  const { data } = await axios.get(`/api/posts/timeline/${userId}`);
  return data;
});

export const getPostDetails = createAsyncThunk("post/getPostDetails", async (postId) => {
  const { data } = await axios.get(`/api/posts/${postId}`);
  return data;
  }
);

export const getComments = createAsyncThunk("post/getComments", async (commentId) => {
  const { data } = await axios.get(`/api/posts/comments/${commentId}`);
  return data;
});

export const addPost = createAsyncThunk("post/addPost", async (postData)=>{
  const {data} = awaitaxios.post(`/api/posts/new`, postData);
  return data;
});

export const updatePost = createAsyncThunk("post/updatePost", async (postData)=>{
  const {data} = awaitaxios.put(`/api/posts/${postData.postId}`, postData);
  return data;
});

export const deletePost = createAsyncThunk("post/deletePost", async (postId) => {
  const { data } = await axios.delete(`/api/posts/${postId}`);
  return data;
  }
);

export const addLike = createAsyncThunk("post/addLike", async (likeData) => {
  const { data } = await axios.get(`/api/posts/${likeData.postId}/like`, likeData);
  return data;
  }
);

export const addComment = createAsyncThunk("post/addComment", async (commentData)=>{
  const {data} = await axios.post(`/api/posts/${commentData.postId}/comment`, commentData);
  return data;
});



export const postSlice = createSlice({
  name: "post",

  initialState,

  reducers: {},

  extraReducers: {
    [getAllPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts = action.payload;
    },
    [getAllPosts.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getTimelinePosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getTimelinePosts.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts = action.payload;
    },
    [getTimelinePosts.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getPostDetails.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPostDetails.fulfilled]: (state, action) => {
      state.status = "success";
      state.post = action.payload;
    },
    [getPostDetails.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getComments.pending]: (state, action) => {
      state.status = "loading";
    },
    [getComments.fulfilled]: (state, action) => {
      state.status = "success";
      state.comments = action.payload;
    },
    [getComments.rejected]: (state, action) => {
      state.status = "failed";
    },

    [addPost.pending]: (state, action) => {
      state.status = "loading";
    },
    [addPost.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts = action.payload;
    },
    [addPost.rejected]: (state, action) => {
      state.status = "failed";
    },

    [updatePost.pending]: (state, action) => {
      state.status = "loading";
    },
    [updatePost.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts = action.payload;
    },
    [updatePost.rejected]: (state, action) => {
      state.status = "failed";
    },

    [deletePost.pending]: (state, action) => {
      state.status = "loading";
    },
    [deletePost.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts = action.payload;
    },
    [deletePost.rejected]: (state, action) => {
      state.status = "failed";
    },

    [addLike.pending]: (state, action) => {
      state.status = "loading";
    },
    [addLike.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts = action.payload;
    },
    [addLike.rejected]: (state, action) => {
      state.status = "failed";
    },

    [addComment.pending]: (state, action) => {
      state.status = "loading";
    },
    [addComment.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts = action.payload;
    },
    [addComment.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default postSlice.reducer;
export const { updateLike } = postSlice.actions;
