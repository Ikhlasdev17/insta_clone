import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from '../../assets/api/auth'
const initialState = {
  user: null,
  loading: false,
  token: localStorage.getItem("insta_token") || null,
  status: null
}

export const loginUser = createAsyncThunk("auth/login", async ({ email, password }) => {
  try {
    const { data } = await axios
      .post(`/auth/login`, {
        email, password
      })
      
    if (data?.payload?.access_token) {
      localStorage.setItem("insta_token", data?.payload.access_token)
    }
    toast.success(`Hello, ${data.payload.user.username}`)
    return data

  } catch (error) {
    toast.error("Password or Email is incorrect!")
    console.log(error);
  }
})

export const getMe = createAsyncThunk("auth/getMe", async () => {
  try {
    const {data} = await axios.get("/auth/me")
    return data
  } catch (error) {
    console.log(error);
  }
})


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {

    }
  },
  extraReducers: {
    // login user
    [loginUser.pending]: (state) => {
      state.loading = true
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false
      state.status = "logged-in"
      state.token = action.payload.payload.access_token
      state.user = action.payload.payload.user
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false
    },
    // get me
    [getMe.pending]: (state, action) => {
      state.loading = true
    },
    [getMe.fulfilled]: (state, action) => {
      state.loading = false
      state.status = "logged-in"
      state.token = action.payload.payload.access_token
      state.user = action.payload.payload.user
    },
    [getMe.rejected]: (state, action) => {
      state.loading = false
    }
  }
})



export const checkIsAuth = (state) => Boolean(state.auth.token)

export const { logout } = authSlice.actions
export default authSlice.reducer