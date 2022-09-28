import React, { useEffect } from 'react'
import profilePic from '../../assets/images/profile.png';
import postPhoto from '../../assets/images/1.png';
import heart from '../../assets/images/Icons/Like.svg'
import heartActive from '../../assets/images/Icons/ActivityFeed-Fiil.svg'
import comment from '../../assets/images/Icons/Comment.svg'
import sharePost from '../../assets/images/Icons/SharePosts.svg'
import savePost from '../../assets/images/Icons/Save.svg'
import emoji from '../../assets/images/Icons/Emoji.svg'
import more from '../../assets/images/Icons/More.svg'
import { useState } from 'react';
import axios from '../../assets/api/auth'
import {toast} from "react-toastify"
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import ModalWindow from '../../components/ModalWindow';
import { fetchedPosts, fetchingErrorPosts, fetchingPosts } from '../../redux/reducers/postsReducer';
import spinner from '../../assets/images/sp.svg'
import SinglePost from '../../components/SinglePost';
import Alert from '../../components/Alert';

const Posts = () => {
  const [likeLoading, setLikeLoading] = useState(false)
  const { user } = useSelector(state => state.auth)
  const { status, posts } = useSelector(state => state.posts)
  const [postsData, setPosts] = useState(posts)
  const dispatch = useDispatch()
  const [postDetails, setPostDetails] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState(null)
  const [alert, setAlert] = useState(false)
  const [refresh, setrefresh] = useState(false)
  useEffect(() => {
    dispatch(fetchingPosts())
    axios.get('/post/all')
      .then((res) => {
        dispatch(fetchedPosts(res.data.posts))
      })
      .catch((err) => {
        dispatch(fetchingErrorPosts())
      })
  }, [refresh])

  const likePost = (id) => {
    setLikeLoading(true)
    axios.put(`/post/like/${id}`)
      .then((res) => { 
        let newPosts = []
        posts?.map((item)=>{
          if (item?._id?.toString() === res.data?.payload._id.toString()){
            newPosts.push(res.data?.payload)
          } else {
            newPosts.push(item)
          }
        })
        dispatch(fetchedPosts(newPosts))
      })
      .finally(() => setLikeLoading(false))
  }

  const commentPost = (id, text) => {
    axios.put(`/post/comment/${id}`, {
      text
    })
    .then((res) => {
        let newPosts = []
        posts?.map((item)=>{
          if (item?._id?.toString() === res.data?.payload._id.toString()){
            newPosts.push(res.data?.payload)
          } else {
            newPosts.push(item)
          }
        })
        dispatch(fetchedPosts(newPosts))
    })
  } 


  const deletePost = (id) => {
    axios.delete(`/post/${id}`)
      .then(() => {
        toast.info("Post deleted!")
        setAlert(false)
        setrefresh(!refresh)
      })
      .catch((err) => {
        setAlert(false)
      })
  }


  return (
    <div className='home-posts'>  
    {
      alert && <Alert id={selectedPostId} deleteThis={deletePost} setIsOpen={() => setAlert(false)} />
    }
      <center className={`loader ${status === "loading" ? "loading" : ""}`}>
        <img src={spinner} width={50} />
      </center>
      {
        postDetails && <SinglePost refresh={refresh} setrefresh={setrefresh} setIsOpen={() => setPostDetails(false)} selectedPost={selectedPostId} />
      }
      {
        posts?.map((item, index) =>(
          <div key={index} className={`post mt-6 sm:mt-4 bg-white`}>
            {/* post headder */}
            <div className="post-header">
              <Link to={`/user/${item?.author?._id}`} className='post__author'>
                <img width={30} height={30} className="cover" src={item?.author?.photo} alt="" />
                <span>{item?.author?.username}</span>
              </Link>
              {
                item?.author?._id === user?._id && (
                  <img 
                    src={more} 
                    className="post-more" 
                    alt="" 
                    onClick={() => {
                      setSelectedPostId(item?._id)
                      setAlert(true)
                    }}
                    />
                    )
                  }

            </div>

            {/* post photo */}
            <img 
              onDoubleClick={() => likePost(item?._id)}
              className='post-img' 
              src={item?.photo !== "not photo" ? item?.photo : "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png"} alt="" />

                 
            {/* post body */}
            <div className='post-body'>
              <div className="post-body__header">
              <div className="post-body__icons">
                <div className='pb-icons cursor-pointer' >
                  <button className='disabled:opacity-50' disabled={likeLoading} onClick={e => likePost(item?._id)}>
                    {
                      item?.likes?.findIndex(x => x?.toString() === user?._id?.toString()) === -1 ? (
                        <img  src={heart} alt="" />
                        ) : (
                        <img  src={heartActive} alt="" />
                      )
                    }
                  </button>
                  <img onClick={e => {
                      setSelectedPostId(item)
                      setPostDetails(true)
                    }} src={comment} alt="" />
                  {/* <img src={sharePost} alt="" /> */}
                </div>
                <div className="save-post">
                  <img src={savePost} alt="" />
                </div>
              </div>

              {/* post details */}
              <div className='post-info'>
                <b className='likes'>
                  {item?.likes?.length?.toLocaleString()} likes
                </b>
                <div className='author-description'>
                  <b><Link to={`/user/${item?.author?._id}`}>{item?.author?.username}</Link> </b>
                  {item?.description?.length > 75 ? `${item?.description?.slice(0, 75)}...` : item?.description}
                  {item?.description?.length > 75 && <span className='more-btn' onClick={e => {
                      setSelectedPostId(item)
                      setPostDetails(true)
                    }}>more</span>}
                </div>
                <div className="comments-text">
                {
                  item?.comments?.length ? (
                    <span onClick={e => {
                      setSelectedPostId(item)
                      setPostDetails(true)
                    }}>View all {item?.comments?.length} comments</span>
                  ) : (
                    "No comments"
                  )
                }
                </div>
                <span className='created-at'>{moment(item?.createdAt).fromNow()}</span>
                
              </div>
              </div>

              {/* post footer */}
              <div>
                <form className='post-footer' onSubmit={e => {
                  e.preventDefault()
                  commentPost(item?._id, e.target[0].value)
                  e.target[0].value = ''
                }}>
                  <img src={emoji} alt="" />
                  <input type="text" placeholder='Add a comment...' />
                  <button type='submit'>Post</button>
                </form>

              </div>
            </div>
          </div> 
        )).reverse()
      }
    </div>
  )
}

export default Posts