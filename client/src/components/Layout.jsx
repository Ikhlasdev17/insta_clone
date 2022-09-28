import React from 'react'
import Navbar from './Navbar'
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkIsAuth } from '../redux/reducers/authSlice'
import { useState } from 'react'
import Loading from './Loading'
const Layout = () => {
  const isAuth = useSelector(checkIsAuth)
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [location])


  if (isAuth) {
    return (
    <div>
      <Navbar />
      {
        loading ? (
          <Loading />
        ) : (
          <Outlet />
        )
      }
    </div>)
  } else {
    return <Navigate to={"/login"} state={{ from: location }} replace />
    }
}

export default Layout 