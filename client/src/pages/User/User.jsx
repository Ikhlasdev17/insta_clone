import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../assets/api/auth'
import SinglePost from '../../components/SinglePost'
const User = () => {
  const { user } = useSelector(state => state.auth)
  const [myPosts, setMyPosts] = useState([])
  const params = useParams()
  const [thisUser, setThisUser] = useState({})
  const navigate = useNavigate()
  const [postDetails, setPostDetails] = useState(false)
  const [selectedPost, setSelectedPost] = useState({})
  console.log(params);

  useEffect(() => {
    if (params.id) {
      axios.get(`/user/${params?.id}`)
      .then((res) => {
        setThisUser(res.data.payload)
      })

      axios.get(`/post/user/${params.id}`)
        .then((res) => {
          setMyPosts(res.data.payload)
          console.log(res.data);
        })
    } else {
      navigate("/", {replace: true})
    }
  }, [])

  if (!params) return <div className="mini-container">
    <center>User not found!</center>
  </div>

  return (
    <div className='mini-container'>
      {postDetails && <SinglePost selectedPost={selectedPost} setIsOpen={() => setPostDetails(false)} />}
      <div className="profile-head flex px-8 pt-4 pb-12 items-center ">
        <div className="profile-photo">
          <img width={150} height={150} src={thisUser?.photo} alt="" />
        </div>
        <div className="profile-info">
          <div className='flex gap-x-4 items-end '>
            <span className='font-medium'>{thisUser?.email}</span>
            <button className='btn btn-primary'>Follow</button>
          </div>
          <span className='flex gap-x-8 my-4'>
            <span><b>{myPosts?.length}</b> posts</span>
            <span><b>{thisUser?.followers?.length}</b> followers</span>
            <span><b>{thisUser?.followings?.length}</b> followings</span>
          </span>
          <span className='font-medium'>{thisUser?.username}</span>
        </div>
      </div>
      <div className="profile-posts">
        {
          myPosts?.map((item, index) => (
            <img 
              className='cursor-pointer'
              src={item?.photo} 
              key={index}
              onClick={() => {
                setSelectedPost(item)
                setPostDetails(true)
              }}
            />
          ))
        }
      </div>
    </div>
  )
}

export default User