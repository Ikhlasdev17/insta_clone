import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../../assets/api/auth'
import SinglePost from '../../components/SinglePost'
const Profile = () => {
  const { user } = useSelector(state => state.auth)
  const [myPosts, setMyPosts] = useState([])
  const [postDetails, setPostDetails] = useState(false)
  const [selectedPost, setSelectedPost] = useState({})

  useEffect(() => {
    axios.get("/post/myposts")
      .then((res) => {
        setMyPosts(res.data.posts)
      })
  }, [])


  return (
    <div className='mini-container'>
      {postDetails && <SinglePost selectedPost={selectedPost} setIsOpen={() => setPostDetails(false)} />}
      <div className="profile-head flex px-8 pt-4 pb-12 items-center ">
        <div className="profile-photo">
          <img width={150} height={150} src={user?.photo} alt="" />
        </div>
        <div className="profile-info">
          <div className='flex gap-x-4 items-end '>
            <span className='font-medium'>{user?.email}</span>
            <button className='btn btn-bordered'>Edit profile</button>
          </div>
          <span className='flex gap-x-8 my-4'>
            <span><b>{myPosts?.length}</b> posts</span>
            <span><b>{user?.followers?.length}</b> followers</span>
            <span><b>{user?.followings?.length}</b> followings</span>
          </span>
          <span className='font-medium'>{user?.username}</span>
        </div>
      </div>
      <div className="profile-posts">
        {
          myPosts?.map((item, index) => (
            <img className='cursor-pointer' onClick={() => {
              setSelectedPost(item)
              setPostDetails(true)
            }} src={item?.photo} key={index} />
          ))
        }
      </div>
    </div>
  )
}

export default Profile