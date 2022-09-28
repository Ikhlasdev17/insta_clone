import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { checkIsAuth } from '../redux/reducers/authSlice'

const RequiredAuth = () => {
  const { isAuth } = useSelector(checkIsAuth)
  const location = useLocation()
  if (!isAuth) return <Outlet />
  return (
    <Navigate to={'/'} state={{ from: location }} replace />
  )
}

export default RequiredAuth