import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import { getPost } from '../../actions/posts';

import './PostDetails.css'

import LoaderCircle from '../LoaderCircle/LoaderCircle';
import SidePostModel from './SidePostModel/SidePostModel';
import DownSameUserModel from './DownPostModels/DownSameUserModel';
import DownRecomModel from './DownPostModels/DownRecomModel';
import Comments from './Comments/Comments';
import SavePost from './SavePost/SavePost';

const PostDetails = ( ) => {

  const user = JSON.parse(localStorage.getItem('profile'));
  const currentPath = location.pathname;
  console.log(currentPath)

  const [commentsLen, setCommentsLen] = useState();

  const [commentSec, setCommentSec] = useState(false);
  const showCommentSec = () => {
    setCommentSec((prevcommentSec) =>
    !prevcommentSec);
  };

  const { post, randomPosts, postsByCreator, postsByTags, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  if (!post) {
    return (
      <div className='w-full min-h-screen
        flex justify-center items-center 
        top-0 z-10 '>
        <LoaderCircle />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='w-full min-h-[550px]
        flex justify-center items-center 
        top-0 z-10 '>
        <LoaderCircle />
      </div>
    )
  }

  const sameTagPosts = postsByTags.filter(({ _id }) => _id !== post._id);
  const sameCreatorPosts = postsByCreator.filter(({ _id }) => _id !== post._id);
  const recomPosts = randomPosts.filter(({ _id }) => _id !== post._id);


  return (
    <>
    <div className='w-full h-max
    flex lg:flex-row flex-col '>

      <div className='lg:w-[70%] w-full 
        h-max bg-[#efeded]
        duration-200 ease-in
        2xl:px-[70px] xl:px-[55px] lg:px-8 md:px-6 px-4'>

        <div className='w-full h-max 
          flex flex-col items-start mt-4'>
          {/* <p className='sm:text-16 text-14'>
            {moment(post.createdAt).format("MMMM D YYYY")}
          </p> */}
          <p className='w-full h-max whitespace-normal
          font-bold mt-2 leading-10
          lg:text-[45px] sm:text-[40px] text-[34px] '>
            { post.title }
          </p>
          <p className='text-14 mt-2'>
            { post.tags.map((tag) => `#${tag} `) }
          </p>
          
          <div className='flex sm:flex-row flex-col
            w-full h-max mt-4 justify-between
            sm:items-center items-start'>

            <div className='flex items-center
              w-full h-max'>
              <p className='w-[40px] h-[40px]
                bg-blue-500 rounded-full
                text-white text-[20px] uppercase
                flex justify-center items-center
                mr-2'>
                {post.name.charAt(0)}
              </p>
              <div className='flex flex-col items-start'>
                <p className='text-16'>
                  {post.name}
                </p>
                <p className='text-14'>
                  {moment(post.createdAt).format("MMM D YYYY")}
                </p>
              </div>
            </div>
            
            <div className='flex items-center
            sm:mt-0 mt-3'>
              <button onClick={showCommentSec}
                className='w-max h-max 
                sm:mr-4 mr-3
                sm:px-0 sm:py-0 px-3 py-1
                sm:bg-transparent bg-gray-200 
                rounded-full outline-none border-none
                sm:text-14 text-12
                sm:text-gray-500
                text-gray-800
                hover:text-gray-900
                flex items-center'>
                <svg className='sm:w-[26px] sm:h-[28px]
                  w-[22px] h-[24px]'
                  viewBox="0 0 24 24">
                  <path fill="currentColor" 
                  d="M18 16.8a7.14 7.14 0 0 0 2.24-5.32c0-4.12-3.53-7.48-8.05-7.48C7.67 4 4 7.36 4 11.48c0 4.13 3.67 7.48 8.2 7.48a8.9 8.9 0 0 0 2.38-.32c.23.2.48.39.75.56 1.06.69 2.2 1.04 3.4 1.04.22 0 .4-.11.48-.29a.5.5 0 0 0-.04-.52 6.4 6.4 0 0 1-1.16-2.65v.02zm-3.12 1.06l-.06-.22-.32.1a8 8 0 0 1-2.3.33c-4.03 0-7.3-2.96-7.3-6.59S8.17 4.9 12.2 4.9c4 0 7.1 2.96 7.1 6.6 0 1.8-.6 3.47-2.02 4.72l-.2.16v.26l.02.3a6.74 6.74 0 0 0 .88 2.4 5.27 5.27 0 0 1-2.17-.86c-.28-.17-.72-.38-.94-.59l.01-.02z"/>
                </svg>
                <p>
                  {commentsLen || null}
                </p>
              </button>

              <div>
                <SavePost post={post}/>
              </div>

            </div>
            
          </div>
          
        </div>

        <div className='w-full h-max mb-8  
          sm:mt-8 mt-6
          flex flex-col items-start '>
          <img className='w-full h-max rounded mb-4
          shadow-md aspect-[16/9]'
          src={post.selectedFile} alt={ post.title } />

          <p className='w-full h-max 
            sm:mt-4 mt-2 text-gray-600
            sm:text-20 text-18 p-1
            font-normal leading-6 
            whitespace-pre-wrap'>
            { post.message }
          </p>
        </div>

        <div className='w-full h-max bg-[#efeded]'>
          <p className='flex items-center 
          font-semibold pb-6 pt-3
          sm:text-20 text-18 text-gray-700
          w-full h-max '>
            {sameTagPosts.length >= 2 ? (
              'Recommended for you'
            ) : (
              `More from ${post.name}`
            )}
          </p>
          {sameTagPosts.length >= 2 ? (
            (recomPosts.slice(0, 4).map((post) => (
              <div key={post._id}>
                <DownRecomModel post={post} />
              </div>
            )))
          ) : (
            (sameCreatorPosts.slice(0, 4).map((post) => (
              <div key={post._id}>
                <DownSameUserModel post={post} />
              </div>
            )))
          )}
        </div>
        
      </div>

      <div id='sidePostsDiv'
      className='w-[30%] sticky
      top-0 right-0 pb-4
      hidden lg:flex flex-col
      items-center xl:border-l-2
      h-screen 
      overflow-scroll'>
        
        <div className='w-full h-max 
        flex-col flex bg-[#efeded]
        justify-center items-center
        2xl:px-8 xl:px-6 px-5'>

          <p className='flex items-center 
          xl:px-4 px-2.5 font-semibold
          text-18 text-gray-700
          w-full h-max pt-3 pb-1.5'>
            {sameTagPosts.length >= 2 ? (
              'Similar tagged posts'
            ) : (
              'Recommended for you'
            )}
          </p>
          {sameTagPosts.length >= 2 ? (
            (sameTagPosts.slice(0, 4).map((post) => (
                <div key={post._id}>
                    <SidePostModel post={post} />
                </div>
            )))
          ) : (
            (recomPosts.slice(0, 4).map((post) => (
                <div key={post._id}>
                    <SidePostModel post={post} />
                </div>
            )))
          )}
        </div>

      </div>

      <div className={'w-full h-screen bg-black/20 '+
      'fixed top-0 left-0 z-40 '+
      (commentSec ? (
        ' translate-x-0 '
      ) : (' translate-x-[120%] '))}>

        <div onClick={showCommentSec}
        className='2xl:w-[68%] lg:w-[60%] w-0 h-screen 
        cursor-pointer'>

        </div>

        <div className={'2xl:w-[32%] lg:w-[40%] w-full h-screen bg-[#fbfbfb] '+
        'fixed  right-0 top-0 bottom-0 comment_sec '+
        (commentSec ? (
          ' translate-x-0 '
        ) : (' translate-x-[120%] '))}>

          <Comments post={post} showCommentSec={showCommentSec}
          setCommentsLen={setCommentsLen}/>

        </div>
      </div>  

    </div>
    </>
  )
}

export default PostDetails