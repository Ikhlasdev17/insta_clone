import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from '../assets/api/auth'
import emoji from '../assets/images/Icons/Emoji.svg'

const SinglePost = ({ selectedPost, setIsOpen = () => {} }) => {
  const [post, setPost] = useState(selectedPost)
  
 
  const commentPost = (id, text) => {
    axios.put(`/post/comment/${id}`, {
      text
    })
    .then((res) => {
      setPost(res.data.payload)
    })
  } 
  if (!post) return <center>Post id required!</center>
  return (
    <div className="modal-container">
      <svg
        className='close-modal'
        fill='#ddd'
        onClick={() => setIsOpen()}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" /></svg>
      
      <div className='post-details-modal  flex items-stratch bg-white rounded-sm overflow-hidden' >
      <div className="post-img">
        <img  src={post?.photo} alt="" />
      </div>
      <div className="post-details">
        <div className="post-details__head flex items-center p-4 gap-x-4 border-b border-gray-500">
          <img width={40} src={post?.author?.photo} alt="" />
          <span className='font-medium'>{post?.author?.username}</span>
        </div>
        <div className="post-details__body">
          <ul className='w-full p-4'>
            <li className='flex gap-x-4 mb-4'>
              <div style={{ minWidth: "40px"}}>
                <img width={40} height={40} src={post?.author?.photo} alt="Author" />
              </div>
              <div style={{ width: "auto" }}>
                <b className='text-sm'><Link to={`/user/${post?.author?._id}`}>{post?.author?.email}</Link></b>{" "}
                <span className='text-sm'>{post?.description}</span>
              </div>
            </li>
            {
              post?.comments?.map((item, index) => (
                <li className='flex gap-x-4 mb-4'>
                  <div style={{ minWidth: "40px"}}>
                    <img width={40} height={40} src={item?.commentBy?.photo} alt="Author" />
                  </div>
                  <div style={{ width: "auto" }}>
                    <b className='text-sm'><Link to={`/user/${item?.commentBy?._id}`}>{item?.commentBy?.email}</Link></b>{" "}
                    <span className='text-sm'>{item?.text}</span>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
          <div className='post-details-footer'>
                <form className='post-footer' onSubmit={e => {
                  e.preventDefault()
                  commentPost(post?._id, e.target[0].value)
                  e.target[0].value = ''
                }}>
                  <img src={emoji} alt="" />
                  <input type="text" placeholder='Add a comment...' />
                  <button type='submit' className='font-semibold text-blue-400'>Post</button>
                </form>

              </div>
      </div>
    </div>
    </div>
  )
}

export default SinglePost