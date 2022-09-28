import React from 'react'
import Posts from '../Posts/Posts'
import '../../styles/Home.scss'
import Sidebar from '../Sidebar/Sidebar'
const Home = () => {
  return (
    <div className='home-row mini-container'>
      <Posts />
      <Sidebar />
    </div>
  )
}

export default Home