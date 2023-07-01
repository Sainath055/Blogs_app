import React,{ useState, useEffect } from 'react'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './postStyles.css'

import { BsBookmarkFill, BsThreeDotsVertical, BsBookmark } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { ImArrowUp } from "react-icons/im";
import { SlOptionsVertical } from "react-icons/sl";


import { deletePost, savePost } from '../../../actions/posts';

const post = ({ post, setCurrentId }) => {

  const [saved, setSaved] = useState(post?.saved);

  const dispatch = useDispatch(); 
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?.sub || user?.result?._id;

  const hasSaved = post.saved.find((save) => save === userId);

  const openPost = () => {
    history.push(`/posts/${post._id}`)
  }

  const handleSave = async () => {
    dispatch(savePost(post._id));

    if (hasSaved) {
      setSaved(post.saved.filter((id) => id !== userId));
    } else {
      setSaved([...post.saved, userId]);
    }
  }

  const handleEdit = () => {
    setCurrentId(post._id)
    history.push('/write')
  }


  return (
    <>
    <div className='w-[350px] h-max bg-[#fbfbfb] 
      rounded-xl relative p-3
      drop-shadow hover:shadow-xl duration-150
      /hover:-translate-y-[4px] '>

      <img onClick={openPost}
      className='w-full aspect-[16/9] rounded-lg cursor-pointer shadow-md'
      src={post.selectedFile}/>

    {/* <div 
      className='z-10 rounded-t-xl cursor-pointer
      w-full h-[45%] flex justify-end
      absolute top-0 items-start p-4'>
        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator ) && (
          <div id='postOptCont'
            className='relative flex 
            flex-col items-center'>
            <BsThreeDotsVertical className='text-white text-22 
            cursor-pointer  w-max h-max bg-slate-900/70
            rounded-full p-2' />

            <ImArrowUp id='postOptArrow'
            className='text-xl pt-2 px-3 
            w-max h-max hidden shadow-xl
            text-white absolute top-[32px]'/>

            <div id='postOptDiv'
            className='w-[100px] h-[100px] rounded
            ease-in flex-col hidden
            items-center justify-evenly 
            bg-white absolute top-[50px] drop-shadow-md'>

              <button onClick={() => {
                setCurrentId(post._id),
                history.push('/write')}}
              className='w-full h-[32px] text-[#6e6d7a]
              text-14 flex items-center px-3
              hover:bg-[#efefef] hover:text-[#171717]'>
                <FiEdit className='mr-2 ' />
                Edit
              </button>

              <button onClick={() => dispatch(deletePost(post._id))}
              className='w-full h-[32px] text-[#6e6d7a]
              text-14 flex items-center px-3
              hover:bg-[#efefef] hover:text-[#171717]'
                id='delBtn'>
                <AiOutlineDelete id='delIcon'
                className='mr-2 text-16' />
                Delete
              </button>
            </div>

          </div>
        )}
    </div>  */}

      <div className='w-full h-max 
        overflow-hidden px-1 pt-5'> 
        <p className='flex truncate'>
          {post.tags.map((tag, i) => {
            return <span key={i} 
              className='bg-gray-200 mr-2 w-max
              text-12 rounded-lg text-gray-700
              px-1.5 py-0.5'>
              {tag}
            </span>
          })} 
        </p>
        <p onClick={openPost}
        className='font-bold cursor-pointer
        text-20 text-gray-800
        pt-2 truncate'>
          {post.title}
        </p>
        <p onClick={openPost}
        className='text-14 cursor-pointer 
        text-gray-500 
        w-full h-max line-clamp-3
        pt-1 overflow-hidden '>
          {post.message}
        </p>
      </div>

      <div className='w-full h-max px-1 pt-3
        flex items-center justify-between '>

          <div className='flex items-center
            w-full h-max'>
            <p className='w-[33px] h-[33px]
              bg-violet-700 rounded-full
              text-white text-[18px] uppercase
              flex justify-center items-center
              mr-2'>
              {post.name.charAt(0)}
            </p>
            <div className='flex flex-col items-start'>
              <p className='text-14'>
                {post.name}
              </p>
              <p className='text-12 text-gray-500'>
                {moment(post.createdAt).format("MMM D YYYY")}
              </p>
            </div>
          </div>

          
          {(user?.result?.sub !== post?.creator && user?.result?._id !== post?.creator ) 
          ? (
            <button onClick={handleSave}
              className='text-md text-gray-600 w-max h-max'>
              {saved.find((save) => save === userId)
                ? (
                  <svg className='w-[25px] h-[25px]'
                      viewBox="0 0 24 24">
                      <path fill="currentColor"
                      d="M7.5 3.75a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-14a2 2 0 0 0-2-2h-9z" />               
                  </svg>
                ) : (
                  <svg className='w-[25px] h-[25px]'
                      viewBox="0 0 24 24">
                      <path fill="currentColor" 
                      d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5v-2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V5.75z"/>
                  </svg>
              )}
            </button>
          ) : (
            <div id='postOptCont' className='relative flex 
            flex-col items-center'>
              <SlOptionsVertical className='text-[17px] text-gray-600 cursor-pointer'/>

              {/* <div id='postOptArrow'
            className='p-3 rounded-full
            w-max h-max flex shadow-xl bg-blue-600
            text-white absolute top-0 right-1' ></div> */}

                <div id='postOptDiv'
                  className='w-[100px] h-[100px] rounded
                  ease-in flex-col hidden bg-[#f5f2f2]
                  items-center justify-evenly 
                  absolute right-3 -bottom-1 
                  drop-shadow-md'>

                  <button onClick={handleEdit}
                  className='w-full h-[32px] text-[#171717]
                  text-14 flex items-center px-3
                  hover:bg-[#ffffff] hover:text-[#171717]'>
                    <FiEdit className='mr-2 ' />
                    Edit
                  </button>

                  <button onClick={() => dispatch(deletePost(post._id))}
                  className='w-full h-[32px] text-[#171717]
                  text-14 flex items-center px-3
                  hover:bg-[#ffffff] hover:text-[#171717]'
                    id='delBtn'>
                    <AiOutlineDelete id='delIcon'
                    className='mr-2 text-16' />
                    Delete
                  </button>
                </div>
                
            </div>
          )}
          
      </div>
      
    </div>
    </>
    
  )
}

export default post;