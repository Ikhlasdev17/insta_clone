import { createSlice } from '@reduxjs/toolkit'

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "default"
  },
  reducers: {
    fetchingPosts: (state) => {
      state.status = "loading"
    },
    fetchedPosts: (state, action )=>{
      state.status = "default"
      state.posts = action.payload
    },
    fetchingErrorPosts: (state, action) => {
      state.status = "error"
    },
    addPost: (state, action) => {
      state.posts = [...state.posts, action.payload]
    }
  }
})

export const { fetchedPosts, fetchingErrorPosts, fetchingPosts, addPost  } = postsSlice.actions
export default postsSlice.reducer
