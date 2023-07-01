import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { BsBookmark } from "react-icons/bs";
import { MdOutlineBookmark, MdOutlineBookmarkAdd } from 'react-icons/md';


const SidePostModel = ({ post }) => {

  const history = useHistory()

  const openPost = () => {
    history.push(`/posts/${post._id}`)
  }

  // console.log(post.saved)

  return (
    <>
      <div 
        className='w-full h-max 
        bg-[#fbfbfb] xl:px-4 px-2.5 py-4 xl:mb-4
        flex flex-col items-start justify-center xl:rounded-lg' >

        <div onClick={openPost}
          className='w-full h-max cursor-pointer'>
          <img className='w-full h-max rounded mb-5 aspect-[16/9]'
          src={post.selectedFile} alt={ post.title } />
        </div>
        
        <div className='w-full h-max 
          flex flex-col items-start justify-center'>
          <p className='flex truncate'>
            {post.tags.map((tag, i) => {
              return <span key={i} 
                className='bg-gray-200 mr-2 w-max
                text-12 rounded-lg text-gray-500
                px-1.5 py-0.5'>
                {tag}
              </span>
            })} 
          </p>

          <p onClick={openPost}
          className='font-bold cursor-pointer
          text-20 text-gray-700 w-full h-max
          py-1 truncate'>
            {post.title}
          </p> 

          <p onClick={openPost}
          className='text-14 cursor-pointer 
          text-gray-500 
          w-full h-max line-clamp-2
          py-1 overflow-hidden '>
            {post.message}
          </p>
        </div>

        <div className='w-full h-max 
        flex justify-between items-center'>  
          <div className='flex items-center
            w-full h-max mt-1'>
            <p className='w-[35px] h-[35px]
              bg-blue-500 rounded-full
              text-white text-[18px] uppercase
              flex justify-center items-center
              mr-2'>
              {post.name.charAt(0)}
            </p>
            <div className='flex flex-col items-start 
              justify-between'>
              <p className='text-14'>
                {post.name}
              </p>
              <p className='text-12'>
                {moment(post.createdAt).format("MMM D YYYY")}
              </p>
            </div>
          </div>

            
        </div>

      </div>
    </>
  )
}

export default SidePostModel;