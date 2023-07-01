import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePost } from '../../../actions/posts';

import MiniCircleLoader from './MiniCircleLoader';

const SavePost = ({ post }) => {

  const [ loader, setLoader ] = useState(false)

  const { savedPost } = useSelector((state) => state.posts);

  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?.sub || user?.result?._id;

  const [saved, setSaved] = useState(post?.saved);

  const dispatch = useDispatch();

  const hasSavedInSavedPost = savedPost?.saved.find((save) => save === userId);


  const handleSave = async () => {
    setLoader(true);

    await dispatch(savePost(post._id));

    setTimeout(() => {
      setLoader(false)
    }, 2000)
    
    if (hasSavedInSavedPost) {
      setSaved(post.saved.filter((id) => id !== userId));
    } else {
      setSaved([...post.saved, userId]);
    }
  }


  return (
    <>
    <button onClick={handleSave}
        disabled={loader ? true : false}
        className='w-max h-max mr-2
        sm:px-0 sm:py-0 px-3 py-1.5
        sm:bg-transparent bg-gray-200 
        rounded-full outline-none border-none
        sm:text-14 text-12
        sm:text-gray-500 
        text-gray-800
        hover:text-gray-900
        flex items-center'>

        {loader ? (
          <div className='w-max h-max
            flex justify-center items-center '>
            <MiniCircleLoader />
          </div>
      ) : (saved.find((save) => save === userId)
            ? (<>
            <svg className='sm:w-[23px] sm:h-[24px]
                w-[20px] h-[21px] text-gray-900'
                viewBox="0 0 24 24">
                <path fill="currentColor"
                d="M7.5 3.75a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-14a2 2 0 0 0-2-2h-9z"/>               
            </svg>
            <p className='flex sm:hidden
                ml-1'>
                saved
            </p>
            </>
            ) : (<>
            <svg className='sm:w-[23px] sm:h-[24px]
                w-[20px] h-[21px] text-gray-500'
                viewBox="0 0 24 24">
                <path fill="currentColor" 
                d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5v-2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V5.75z"/>
            </svg>
            <p className='flex sm:hidden
                ml-1'>
                save
            </p>
            </>
            )
          ) 
        }
    </button>
    </>
  )
}

export default SavePost