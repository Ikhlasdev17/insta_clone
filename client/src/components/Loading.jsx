import React from 'react'
import spinner from '../assets/images/sp.svg';
const Loading = () => {
  return (
    <div className='py-4 flex justify-center'>
      <img src={spinner} width={50} alt="" />
    </div>
  )
}

export default Loading