import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import postSlice from "./postSlice";
import followSlice from "./followSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    follow: followSlice,
  },
  // middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});
