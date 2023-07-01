import React from 'react';
import { useSelector } from 'react-redux';
import LoaderCircle from '../LoaderCircle/LoaderCircle';
 
import Post from './Post/Post'


const Posts = ({ setCurrentId }) => {
  
  const {posts, isLoading } = useSelector((state) => state.posts);


  if (!posts.length && !isLoading) return 'No posts Found';

  return (
    isLoading ? 
    <div className='w-full min-h-[500px] 
    flex justify-center items-center bg-[#efeded]
     top-0 z-10 '>
      <LoaderCircle />
    </div> : ( 
      <div className='w-full h-max flex flex-col items-center py-6'>
        <div className='w-max h-max bg-[#efeded]
        grid xl:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-8 '>
          {posts.map((post) => (
            <div key={post._id}>
              <Post post={post} setCurrentId={setCurrentId}/>
            </div>
          ))}
        </div>
      </div>
    )

  )
}

export default Posts;