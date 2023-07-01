import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserPosts } from '../../actions/posts';
import LoaderCircle from '../LoaderCircle/LoaderCircle'; 
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const UserMyPosts = () => {

  const history = useHistory();
  
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?.sub || user?.result?._id;

  const { userPosts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => { 
      dispatch(getUserPosts(userId));
  }, []);


  if (!userPosts) {
    return (
      <div className='w-full min-h-[550px]
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

  const openPost = () => {
    history.push(`/posts/${post._id}`)
  }
    
  return (
    <div className='w-full h-max flex flex-col items-center py-4'>
    <div className='w-full h-max lg:px-10 md:px-8 px-6 text-[20px] font-medium'>
      My Posts
    </div>
    {userPosts.length > 0 ?
    <div className='w-max h-max bg-[#efeded] py-6
    grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-4 '>
        {userPosts.map((post) => (
            <div key={post._id}>
              <div className='w-[340px] h-max bg-[#fbfbfb] 
                rounded-xl relative p-3
                drop-shadow hover:shadow-xl duration-150
                /hover:-translate-y-[4px] '>

                <img onClick={openPost}
                className='w-full aspect-[16/9] rounded-lg cursor-pointer '
                src={post.selectedFile}/>

                <div className='w-full h-max 
                  overflow-hidden px-2 pt-5'> 
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
                  <p className='text-12 text-gray-500 mt-1'>
                    {moment(post.createdAt).format("MMM D YYYY")}
                  </p>
                </div>
                
              </div>
            </div>
        ))}
    </div>
    :
    <div className='w-full h-max text-center text-[18px] font-medium'>
      You havent posted any posts yet.
    </div>
    }
    </div>
  )
}

export default UserMyPosts