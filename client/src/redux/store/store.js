import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducers/authSlice";
import postsReducer from "../reducers/postsReducer";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsReducer
  }
}) 