import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  postStatus: "idle",
  commentStatus: "idle",
  post: {},
  posts: [],
  comments: [],
};

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
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

export const getComments = createAsyncThunk("post/getComments", async (postId) => {
  const { data } = await axios.get(`/api/posts/${postId}/comments`);
  return data;
});

export const addNewPost = createAsyncThunk("post/addNewPost", async (postData) => {
  console.log("in the addpost");
  const {data} = await axios.post(`/api/posts/new`, postData);
  return data;
});

export const updatePost = createAsyncThunk("post/updatePost", async (postData)=>{
  const {data} = await axios.put(`/api/posts/${postData.postId}`, postData);
  return data;
});

export const deletePost = createAsyncThunk("post/deletePost", async (postId) => {
  const { data } = await axios.delete(`/api/posts/${postId}`);
  return data;
  }
);

export const addLike = createAsyncThunk("post/addLike", async (likeData) => {
  const { data } = await axios.put(`/api/posts/${likeData.postId}/like`, likeData);
  return data;
  }
);

export const addComment = createAsyncThunk("post/addComment", async (commentData)=>{
  const {data} = await axios.put(`/api/posts/${commentData.postId}/comment`, commentData);
  return data;
});



export const postSlice = createSlice({
  name: "post",

  initialState,

  reducers: {},

  extraReducers: {
    [getAllPosts.pending]: (state, action) => {
      state.postStatus = "loading";
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.postStatus = "success";
      state.posts = action.payload;
    },
    [getAllPosts.rejected]: (state, action) => {
      state.postStatus = "failed";
    },

    [getTimelinePosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getTimelinePosts.fulfilled]: (state, action) => {
      state.postStatus = "success";
      state.posts = action.payload;
    },
    [getTimelinePosts.rejected]: (state, action) => {
      state.postStatus = "failed";
    },

    [getPostDetails.pending]: (state, action) => {
      state.postStatus = "loading";
    },
    [getPostDetails.fulfilled]: (state, action) => {
      state.postStatus = "success";
      state.post = action.payload;
    },
    [getPostDetails.rejected]: (state, action) => {
      state.postStatus = "failed";
    },

    [getComments.pending]: (state, action) => {
      state.commentStatus = "loading";
    },
    [getComments.fulfilled]: (state, action) => {
      state.commentStatus = "success";
      state.comments = action.payload;
    },
    [getComments.rejected]: (state, action) => {
      state.commentStatus = "failed";
    },

    [addNewPost.pending]: (state, action) => {
      state.postStatus = "loading";
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.postStatus = "success";
      state.posts.push(action.payload)
    },
    [addNewPost.rejected]: (state, action) => {
      state.postStatus = "failed";
    },

    [updatePost.pending]: (state, action) => {
      state.postStatus = "loading";
    },
    [updatePost.fulfilled]: (state, action) => {
      state.postStatus = "success";
      state.posts = action.payload;
    },
    [updatePost.rejected]: (state, action) => {
      state.postStatus = "failed";
    },

    [deletePost.pending]: (state, action) => {
      state.postStatus = "loading";
    },
    [deletePost.fulfilled]: (state, action) => {
      state.postStatus = "success";
      state.posts = action.payload;
    },
    [deletePost.rejected]: (state, action) => {
      state.postStatus = "failed";
    },

    [addLike.pending]: (state, action) => {
      state.postStatus = "loading";
    },
    [addLike.fulfilled]: (state, action) => {
      state.postStatus = "success";
      // state.posts = action.payload;
    },
    [addLike.rejected]: (state, action) => {
      state.postStatus = "failed";
    },

    [addComment.pending]: (state, action) => {
      state.commentStatus = "loading";
    },
    [addComment.fulfilled]: (state, action) => {
      console.log(action);
      state.commentStatus = "success";
      // state.posts = action.payload;
    },
    [addComment.rejected]: (state, action) => {
      state.commentStatus = "failed";
    },
  },
});

export default postSlice.reducer;
// export const { updateLike } = postSlice.actions;
