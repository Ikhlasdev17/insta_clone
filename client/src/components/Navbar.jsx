import React, { useEffect, useState } from 'react'
import log from '../assets/images/Logo.svg'

import search from '../assets/images/search.svg'
import homeIcon from '../assets/images/Icons/Home.svg'
import messageIcon from '../assets/images/Icons/Messenger.svg'
import newPosts from '../assets/images/Icons/NewPosts.svg'
import findPeople from '../assets/images/Icons/FindPeople.svg'
import heart from '../assets/images/Icons/ActivityFeed.svg'

import homeIconActive from '../assets/images/Icons/Home-fill.svg'
import messageIconActive from '../assets/images/Icons/Messenger-Fill.svg'
import findPeopleActive from '../assets/images/Icons/FindPeople-Fiil.svg'
import heartActive from '../assets/images/Icons/ActivityFeed-Fiil.svg'

import '../styles/Navbar.scss'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ModalWindow from './ModalWindow'
import { toast } from 'react-toastify'

import axios from '../assets/api/auth'
import { addPost } from '../redux/reducers/postsReducer'
const Navbar = () => {
  const { user } = useSelector(state => state.auth)
  const {pathname} = useLocation()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [photo, setPhoto] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const photoUpload = (file) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "insta_clone")
    fetch("https://api.cloudinary.com/v1_1/ikhlas-cloud/image/upload", {
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .then((data) => setPhoto(data?.secure_url))
  }


  const content = () => (
    photo === "" ? (
      <div className='w-full flex items-center justify-center h-full flex-col '>
      <svg aria-label="Значок, соответствующий медиафайлам, например изображениям или видео" class="_ab6-" color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg> 
      <br />
      <h4 className='font-md text-xl'>Select photo from your computer.</h4>
      <br />
      <label>
        <input onChange={e => photoUpload(e.target.files[0])} type="file" className='hidden' />
      <span className='btn btn-primary'>Select photo.</span>
      </label>
    </div>
    ) : (
      <div className='flex w-full'>
        <img className='upload-img' src={photo} />
        <div className='flex flex-col'>
          <span  className=' flex items-center gap-x-2 w-full px-2 py-4'>
            <img width={30} height={30} src={user?.photo} alt="" />
            <span className='font-semibold'>{user?.username}</span>
          </span>
          <textarea onChange={e => setDescription(e.target.value)} placeholder='Description...' className='m-3 h-32 rounded-md w-full p-3 bg-gray-100'>
          </textarea>
        </div>
      </div>
    )
  )

  const handleSubmit = () => {
    if (photo && description) {
      setLoading(true)
      axios.post('/post/create', {
        description,
        photo
      })
      .then((res) => {
        setModalIsOpen(false)
        dispatch(addPost(res.data?.post))
        navigate("/", { replace: true })
      })
      .catch(() => {
        toast.error("Failed to create post!")
      })
      .finally(() => setLoading(false))
    } else {
      toast.info("Description filed is required!")
    }
  }

  useEffect(() => {
    setPhoto("")
    setDescription("")
  }, [modalIsOpen])


  return (
    <>
    <header className='header'>
      <div className="container">
      <div className='navbar'>
      {/* logo */}
      <Link to={'/'}>
      <img src={log} alt="Instagram" className='logo' />
      </Link>

      <div className="right">
        {/* search */}
      <form className='nav-search'>
        <img src={search} alt="" />
        <input type="text" placeholder='Search' />
      </form>

      {/* navigations */}
      <div className='navigations cursor-pointer'>
        <Link to={'/'}>
          <img src={pathname === "/" ? homeIconActive : homeIcon} alt="Home" />
        </Link>
        <Link to={"/messenger"}>
          <img src={pathname === "/messenger" ? messageIconActive : messageIcon} alt="Messenger" />
        </Link>
        <img onClick={() => setModalIsOpen(true)} src={newPosts} alt="New Post" />
        <Link to={"/find"}>
          <img src={pathname === "/find" ? findPeopleActive : findPeople} alt="Find People" />
        </Link>
          <img src={heart} alt="Find People" />
        <Link to={"/profile"}>
          <img width={30} height={30} src={user?.photo} alt="" />
        </Link>
      </div>
      </div>
    </div>
      </div>
    </header>
    {
      modalIsOpen && (
        <ModalWindow
        isOpen={modalIsOpen}
        setIsOpen={() => setModalIsOpen(!modalIsOpen)}
        content={() => content()}
        width={photo === "" ? "650px" : "800px"}
        title={() => (
          photo === "" ? (
            <div className='font-semibold w-full text-center'>Select photo for create post.</div>
          ) : (
            <div className='w-full flex justify-between items-center'>
              <span className='font-semibold'>Creating post</span>
              <button onClick={e => handleSubmit()} className='btn btn-primary' disabled={loading}>Save post</button>
            </div>
          )
        )}
      />
      )
    }
    </>
  )
}

export default Navbar