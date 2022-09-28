import React from 'react'
import { toast } from 'react-toastify'
import axios from '../assets/api/auth'
const Alert = ({ id, setIsOpen, refresh, setrefresh, deleteThis }) => {

  const deletePost = () => deleteThis(id)

  return (
    <div className="modal-container">
    <svg
      className='close-modal'
      fill='#ddd'
      onClick={() => setIsOpen()}
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" /></svg>
      <div style={{ width: "350px" }} className="bg-white rounded-md flex flex-col">
        <ul className='w-full'>
          <li onClick={deletePost} className='w-full py-4 cursor-pointer text-center alert-item '>
            <span className='text-red-400  font-medium'>Delete post</span>
          </li>
          <li onClick={setIsOpen} className='w-full cursor-pointer py-4 text-center border-b alert-item'>
            <span className=' font-medium'>Cancel</span>
          </li>
        </ul>
      </div>  
    </div>
  )
}

export default Alert