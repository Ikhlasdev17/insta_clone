import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import image from '../../assets/images/login.png'
import instagram from '../../assets/images/Logo.svg'
import store from '../../assets/images/AppStore.png'
import googlePlay from '../../assets/images/GooglePlay.png'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/reducers/authSlice'
import { useEffect } from 'react'

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { status, loading, user } = useSelector(store => store.auth)
  
  useEffect(() => {
    if (status === "logged-in") {
      navigate("/", {replace: true})
    }
  }, [status])

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(loginUser(data))
  }

  return (
    <div className='mini-container flex items-center h-screen'>
      <div className='flex items-center gap-x-4'>
        <img src={image}  alt="" />
        <div className='flex flex-col'>
          <form onSubmit={handleSubmit} className='login-form'>
            <img src={instagram} className="logo" width="175" alt="" />
        <p className='font-semibold text-gray-400 text-center '>Sign in to see photos and videos from your friends.</p>
            <input required onChange={e => setData({...data, email: e.target.value})} type="text" placeholder='Enter your email' />
            <input required onChange={e => setData({...data, password: e.target.value})} type="text" placeholder='Password' />
            <button disabled={!data?.email || !data?.password} >Log In</button>
          </form>

          <div className='login-bottom'>
          Don't have an account? {" "}<Link to={"/register"} className="text-blue font-medium">Register</Link>
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

export default Login