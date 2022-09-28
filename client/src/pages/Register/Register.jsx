import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import image from '../../assets/images/login.png'
import instagram from '../../assets/images/Logo.svg'
import store from '../../assets/images/AppStore.png'
import googlePlay from '../../assets/images/GooglePlay.png'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, registerUser } from '../../redux/reducers/authSlice'
import axios from '../../assets/api/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [data, setData] = useState({email: "", password: "", username: ""})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { status, loading, user } = useSelector(store => store.auth)
  const usAuth = useSelector(checkIsAuth)
  useEffect(() => {
    if (usAuth) {
      navigate("/", {replace: true})
    }
  }, [status])
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`/auth/register`, {
        ...data
      })
      .then(res => {
        toast.success("Successfully registered! Please login!")
        navigate("/login", { replace: true })
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status == 409) {
            toast.error("User already registered!")
          } else {
            toast.error("Failed to register user!")
          }
        } else {
          toast.error("Failed to register user!")
        }

      });
  }

  return (
    <div className='mini-container flex items-center h-screen'>
      <ToastContainer />
      <div className='flex items-center gap-x-4'>
        <img src={image}  alt="" />
        <div className='flex flex-col'>
          <form onSubmit={handleSubmit} className='login-form'>
            <img src={instagram} className="logo" width="175" alt="" />
        <p className='font-semibold text-gray-400 text-center '>Sign up to see photos and videos from your friends.</p>
            <input required onChange={e => setData({...data, email: e.target.value})} type="email" placeholder='Enter your email' />
            <input required onChange={e => setData({...data, username: e.target.value})} type="text" placeholder='Username' />
            <input required onChange={e => setData({...data, password: e.target.value})} type="password" placeholder='Password' />
            <button>Register</button>
          </form>

          <div className='login-bottom'>
          Have an account? {" "}<Link to={"/login"} className="text-blue font-medium">Log in</Link>
          </div>

          {/* get the app */}
          <div className='get-app my-4 flex flex-col justify-center'>
            <span className='text-center text-xs my-4'>Get the app</span>
            <div className='flex gap-x-2 my-2 w-full justify-center'>
              <img src={store} alt="" />
              <img src={googlePlay} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register