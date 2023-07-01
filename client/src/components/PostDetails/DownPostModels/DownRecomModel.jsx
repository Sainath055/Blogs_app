import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { BsBookmark } from "react-icons/bs";
import { MdOutlineBookmarkAdd } from 'react-icons/md';

const DownRecomModel = ({ post }) => {
    
    const history = useHistory()

    const openPost = () => {
        history.push(`/posts/${post._id}`)
    }

  return (
    <>
    <div className='w-full sm:h-[180px] h-[160px] 
        border-b-2 mb-5 p-4 bg-[#fbfbfb] rounded-lg
        flex flex-col items-start ' >

        <div className='w-full h-[70%] flex
            items-center justify-between '>

            <div className='w-[60%] h-full  
            flex flex-col items-start sm:justify-between'>

                <p className='flex truncate w-[80%] 
                    sm:mb-0 mb-2 sm:mt-0 mt-0.5 '>
                    {post.tags.map((tag, i) => {
                    return <span key={i} 
                        className='bg-gray-200 mr-2 w-max
                        text-12 rounded-lg 
                        text-gray-500
                        px-1.5 py-0.5'>
                        {tag}
                    </span>
                    })} 
                </p>

                <p onClick={openPost}
                className='font-bold cursor-pointer
                sm:text-20 text-[16.5px] text-gray-700 w-full h-max
                pb-1 sm:truncate'>
                    {post.title}
                </p> 
                
                <div className='w-full h-max
                sm:block hidden' >
                <p onClick={openPost}
                className='text-14 cursor-pointer 
                text-gray-500
                w-full h-max line-clamp-2
                overflow-hidden '>
                    {post.message}
                </p>
                </div>

            </div>

            <div onClick={openPost}
            className='w-[40%] h-full 
            cursor-pointer overflow-hidden
            flex items-center justify-end'>
            <img className='w-max sm:h-full h-full
            rounded-sm aspect-[16/9]'
            src={post.selectedFile} alt={ post.title } />
            </div>

        </div>

        <div className='w-full h-[30%] mt-2
        flex items-center justify-between'>

            <div className='flex items-center
                w-full h-max '>
                <p className='w-[30px] h-[30px]
                    bg-blue-500 rounded-full
                    text-white text-[15.2px] uppercase
                    flex justify-center items-center
                    mr-2'>
                    {post.name.charAt(0)}
                </p>
                <div className='flex flex-col items-start 
                    justify-between'>
                    <p className='sm:text-14 text-[13px]'>
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

export default DownRecomModel