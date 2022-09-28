import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.scss';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Posts from './pages/Posts/Posts';
import Register from './pages/Register/Register';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMe } from './redux/reducers/authSlice';
import axios from './assets/api/auth'
import Profile from './pages/Profile/Profile';
import RequiredAuth from './components/RequiredAuth';
import User from './pages/User/User';
function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getMe())
    axios.get("/auth/me")
      .catch(() => {
        navigate("/login", {replace: true})
      })
  }, [])
  return (
    <div className="app">
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/user/:id' element={<User />} />
        </Route>
        <Route path='/' element={<RequiredAuth />}>
          <Route path='/login' element={<Login/> } />
          <Route path='/register' element={<Register/> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
