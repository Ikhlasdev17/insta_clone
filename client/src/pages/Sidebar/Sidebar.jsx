import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import sidebarHead from '../../assets/images/pic2.png';
import pic from '../../assets/images/profile.png'
import axios from '../../assets/api/auth'
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const {user} = useSelector(state => state.auth)
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('/user/all')
      .then((res) => {
        setUsers(res?.data?.users)
      })
  }, [])
  console.log(users);
  return (
    <div className='sidebar'>

      {/* sidebar header */}
      <div className="sidebar-head flex justify-between items-center">
        <div className="left flex items-stratch gap-x-4">
        <img width={50} src={user?.photo !== "not photo" ? user?.photo : "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"} width={56} height={56} alt="" />
        <div className="sidebar-user flex flex-col gap-y-1 ">
          <span className='font-medium text-sm' >{user?.email}</span>
          <span className='text-gray-500'>{user?.username}</span>
        </div>
        </div>

        <div className="right cursor-pointer text-blue font-semibold ml-2">
          Switch
        </div>
      </div>

      {/* sidebar body */}
      <div className='sidebar-body mt-5 mb-4'>
        <div className='sidebar-body__header flex justify-between'>
          <span className='text-gray-400 font-semibold'>Suggestions For You</span>
          <button className='font-medium'>See All</button>
        </div>

        {/* sugessted users */}
        <ul className='mt-3 flex flex-col gap-y-3'>
          {
            users?.slice(0,5)?.map((item, index) => (
              <li className='flex items-center justify-between gap-2'>
                <div className='flex items-center justify-between gap-3'>
                  <img width={30} src={item?.photo} alt="" />
                  <div className='flex flex-col'>
                    <span className='font-semibold text-sm  hover:text-blue-500 transition-500'>
                      <Link to={`/user/${item?._id}`}>{item?.username}</Link>
                    </span>
                    <span className='text-gray-500 text-xs'>
                      {
                        item?.followers?.length ? (
                          <span>Followed by <Link to={`/user/${item?.followers[0]?._id}`} className=" hover:text-blue-500">{item?.followers[0]?.username}</Link> {((item?.followers?.length - 1) > 0) ? ` + ${item?.followers?.length - 1} more` : ''}</span>
                        ) : (
                          "No followers!"
                        )
                      }
                    </span>
                  </div>
                </div>
                <span className='text-blue font-medium text-sm cursor-pointer'>
                  {
                    item?.followers?.findIndex((x) => x?._id === user?._id) === -1 ? (
                      <button>Follow</button>
                      ) : (
                        <button>Unfollow</button>
                    )
                  }
                </span>
              </li>
            ))
          }
         

        </ul>

        <div className='topics mt-8'>
          <span className='text-xs font-medium text-gray-400 mr-2 cursor-pointer hover:underline'>About</span>
          <span className='text-xs font-medium text-gray-400 mr-2 cursor-pointer hover:underline'>Press</span>
          <span className='text-xs font-medium text-gray-400 mr-2 cursor-pointer hover:underline'>API</span>
          <span className='text-xs font-medium text-gray-400 mr-2 cursor-pointer hover:underline'>Jobs</span>
          <span className='text-xs font-medium text-gray-400 mr-2 cursor-pointer hover:underline'>Privacy</span>
          <span className='text-xs font-medium text-gray-400 mr-2 cursor-pointer hover:underline'>Terms</span>
          <span className='text-xs font-medium text-gray-400 mr-2 cursor-pointer hover:underline'>Locations</span>
          <span className='text-xs font-medium text-gray-400 mr-2 cursor-pointer hover:underline'>Top Accounts</span>
          <span className='text-xs font-medium text-gray-400 mr-2 cursor-pointer hover:underline'>Hashtags</span>
          <span className='text-xs font-medium text-gray-400 mr-2 cursor-pointer hover:underline'>Language</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar