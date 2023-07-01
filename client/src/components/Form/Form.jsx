import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createPost, updatePost } from '../../actions/posts';
import DropInput from './DropInput';
import setInputHeight from './setInputHeight';

import './Form.css'
import { SlActionRedo } from 'react-icons/sl';


const Form = ({ currentId, setCurrentId,ggs  }) => {
console.log(ggs)
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });

  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));

  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if(post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valuesNotEmpty = Object.values(postData).every((value) => value !== '');
    if(valuesNotEmpty) {
      if(!currentId) {
        dispatch(createPost({...postData, 
          name: user?.result?.name }));
        clear();
        history.push('/posts')
      }else {
        dispatch(updatePost(currentId, {...postData, 
          name: user?.result?.name }));
        clear();
        history.push('/posts')
      }
    } else {
      alert(`Fill all the fields`)
    }
    
  };
  
  const momentDateFormat = moment(postData?.createdAt).format("MMM D YYYY");
  const currentDate = moment(new Date()).format("MMM D YYYY");

  if(!user?.result?.name) {
    return (
      <div className='w-full h-[200px] text-24
      flex items-center justify-center'>
        <p>
          📢 Kindly Sign In to access this page. 😃
        </p>
      </div>
    )
  }

  return (
    <>
    <div className='w-full h-max p-3 '>
      <form autoComplete="off" onSubmit={handleSubmit}
        className='h-full block sm:p-6 p-2 
          w-full
          items-center justify-evenly'>

        <div className='flex w-full mb-2 
          items-center justify-between'>
          <h3 className='font-semibold 
          flex flex-col sm:flex-row
          sm:items-center justify-center
          text-20 text-gray-700'>
            {currentId ? 'Edit' : 'Create' }
            {currentId ? (
              <p className='bg-gray-200 w-max
              text-12 rounded-lg text-gray-700
              px-1.5 py-0.5 sm:ml-2'>
                Created on: {momentDateFormat}
              </p>
            ) : <p className='bg-gray-200 w-max
            text-12 rounded-lg text-gray-700
            px-1.5 py-0.5 sm:ml-2'>
              Date: {currentDate}
            </p>}
          </h3>

          <div className='flex w-max sm:mr-2
            items-center justify-center'>
            <button type="submit"
              className='w-max shadow h-6
              bg-green-600 px-2.5 mr-2
              sm:text-16 text-14
              block rounded-full text-white
              hover:bg-green-700 '>
              {currentId ? 'Save' : 'Publish' }
            </button>
            <button type='reset' onClick={clear}
              className='w-max shadow text-white
              h-6 bg-red-500 px-2.5 
              sm:text-16 text-14
              block rounded-full hover:bg-red-700'>
              Clear
            </button>
          </div>
        </div>

        <div className='flex w-full justify-between h-max
          md:flex-row flex-col-reverse'>

          <div className='flex flex-col w-full h-max'>

            <div className='w-full flex h-max lg:my-2 mt-2
              lg:flex-row flex-col'>
            
              <textarea 
              onMouseOver={(e) => {setInputHeight(e,'50px')}}
                onChange={(e) => {
                  setInputHeight(e,'50px')
                  setPostData({ ...postData, title: e.target.value})
                }}
                value={postData.title}
                className="w-full h-[50px] textareaclass
                p-2 block bg-transparent
                lg:text-20 md:text-18 text-[15px]
                outline-none resize-none
                focus:border-b-2"
                placeholder='Title'
                name="Title" > 
              </textarea>

              <textarea 
                onMouseOver={(e) => {setInputHeight(e,'50px')}}
                onChange={(e) => {
                  setInputHeight(e,'50px')
                  setPostData({ ...postData, tags: e.target.value.toLowerCase().split(',') })
                }}
                value={postData.tags}
                className="w-full h-[50px] textareaclass
                p-2 block bg-transparent 
                lg:text-20 md:text-18 text-[15px]
                outline-none resize-none focus:border-b-2"
                placeholder='Tags Eg:Ps4,Ps5,Pc'
                name="Tags" >
              </textarea>
              
            </div>
            

            <textarea 
            onFocus={(e) => {setInputHeight(e,'120px')}}
            onChange={(e) => {
              setInputHeight(e,'120px')
              setPostData({ ...postData, message: e.target.value })
            }}
            value={postData.message}
            className="w-full h-[120px] textareaclass
            sm:mt-2 focus:border-b-2
            p-2 block bg-transparent
            lg:text-20 md:text-18 text-[15px]
            outline-none resize-none"
            placeholder='Enter your content here...'
            name="message" ></textarea>


          </div>
      
          <div className='sm:w-max sm:block rounded-md
            h-max mt-2 md:ml-4 
            w-full flex items-center justify-center'>
            <DropInput 
              postData={postData}
              setPostData={setPostData} />
          </div>

        </div>
        
      </form>

    </div>
    </>
  )
}

export default Form;