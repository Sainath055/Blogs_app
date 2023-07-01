import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { IoCloseOutline } from 'react-icons/io5';
import setInputHeight from '../../Form/setInputHeight';
import { commentPost } from '../../../actions/posts';

import { BsFillArrowUpCircleFill } from "react-icons/bs";
import SortBtn from './SortBtn';


const Comments = ({ showCommentSec, post , setCommentsLen}) => {

  const user = JSON.parse(localStorage.getItem('profile'));

  const [sortDDInput, setSortDDInput] = useState('Oldest');

  const [comments, setComments] = useState(post?.comments);
  const [commentVal, setCommentVal] = useState('');
  const dispatch = useDispatch();
  const commentsRef = useRef();
  const toTop = useRef();

  useEffect(() => {
    setCommentsLen(comments.length)
  }, [comments])

  const postComment = async () => {
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${commentVal}: ${new Date().toISOString()}`, post._id));

    setCommentVal ('');
    setComments(newComments);

    sortDDInput === 'Oldest' ? commentsRef.current.scrollIntoView({ behavior: 'smooth' }) : (null);
  }

  const instantComment = async (e) => {
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${e}: ${new Date().toISOString()}`, post._id));

    setComments(newComments);

    sortDDInput === 'Oldest' ? commentsRef.current.scrollIntoView({ behavior: 'smooth' }) : (null);
  }

  const clearCommVal = () => {
    setCommentVal('')
  }

  const backToTop = () => {
    toTop.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
    <div className='w-full h-max flex 
    flex-col items-center ' >
      
      <div ref={toTop} ></div>

      <div className='w-full h-max mt-5 px-5
      flex items-center justify-between' >
        
        <p className='text-20 text-gray-700 font-bold'>
          Comments {comments.length > 0 && `(${comments.length})`}
        </p>

        <button onClick={showCommentSec}
          className='w-max h-max '>
          <IoCloseOutline className='text-[28px]
          text-gray-600 hover:text-gray-800'/>
        </button>
      </div>

      {user?.result?.name ? (
      <div className='w-full h-max mt-3 px-6 py-4 border-t-2' >

        <div className='w-full min-h-[130px] h-max
          rounded-lg bg-[#f2f2f2] pt-3 pb-3 overflow-hidden
          flex flex-col items-center justify-between' >
          <textarea 
            onMouseOver={(e) => setInputHeight(e,'50px')}
            onChange={(e) => {
              setInputHeight(e,'50px')
              setCommentVal(e.target.value)
            }}
            value={commentVal}
            className="w-full h-[50px] textareaclass
            block bg-transparent text-14 px-4
            outline-none resize-none"
            placeholder='Share are your thoughts...'
            name="comment" >
          </textarea>

          <div className='w-full h-max
            flex items-center justify-end'>

            <button onClick={clearCommVal}
            className='text-14 
            mr-3 px-1 py-1.5 '>
              Clear
            </button>

            <button onClick={commentVal.length !== 0 ? postComment : null}
            className={'text-14 text-white '+
            'mr-3 bg-green-600 rounded-lg '+
            'px-2.5 py-1 '+
            (commentVal.length === 0 ? (' opacity-70 ') : (null))}>
              Post
            </button>
          </div>

        </div>

        <div className='w-full h-max 
        flex items-center justify-start mt-2'>
          <button onClick={(e) => instantComment(e.target.id)}
          disabled={commentVal.length !== 0 ? (true) : (false)}
          id='Thanks for sharing'
          className={'bg-gray-50 mr-2 w-max '+
              'text-12 rounded-full text-gray-800 '+
              'px-1.5 py-0.5 border-[1.5px] ' +
              'cursor-pointer '+
              (commentVal.length !== 0 ? (' opacity-70 ') : (' hover:bg-gray-200 '))}>
            Thanks for sharing
          </button>
          <button onClick={(e) => instantComment(e.target.id)}
          id='Perfect!'
          disabled={commentVal.length !== 0 ? (true) : (false)}
          className={'bg-gray-50 mr-2 w-max '+
              'text-12 rounded-full text-gray-800 '+
              'px-1.5 py-0.5 border-[1.5px] ' +
              'cursor-pointer '+
              (commentVal.length !== 0 ? (' opacity-70 ') : (' hover:bg-gray-200 '))}>
            Perfect!
          </button>
        </div>

      </div>
      ) : (  
        <div className='w-full h-max mt-3 px-10 pt-4 pb-2 border-t-2 ' >

      <div className='w-full h-max
      rounded-lg bg-[#f2f2f2] py-3 overflow-hidden
      flex flex-col items-center justify-between text-16' >
        <p>Kindly <a href='/auth'
        className='cursor-pointer hover:underline
        text-blue-500'>Signin</a> to write a comment</p>
      </div>
      </div> )}

      {comments.length > 5 ? (
        <div className='w-full h-max px-4 mt-2' >
        <SortBtn sortDDInput={sortDDInput} setSortDDInput={setSortDDInput}/>
      </div>
      ) : (null)}
      

      <div className={'w-full h-max mt-2 px-5 pt-2 ' +
      'border-t-2 flex '+ 
      (sortDDInput === 'Oldest' ? (' flex-col ') : (' flex-col-reverse '))}>
        {comments?.map((c, i) => (
          <div key={i} className='w-full h-max mt-2 mb-1.5 py-2 flex flex-col border-b-2 '>
            <div className='flex items-center
              w-full h-max'>
              <div className='w-[34px] h-[34px]
                bg-blue-500 rounded-full
                text-white text-[16px] uppercase
                flex justify-center items-center
                mr-2'>
                {c.charAt(0)}
              </div>
              <div className='flex flex-col items-start '>
                <div className='text-14'>
                  {c.split(': ')[0]}</div>
                <div className='text-[13.5px] font-normal text-gray-500'>
                  {moment(c.split(': ')[2]).fromNow('')}</div>
              </div>
            </div>
            <div className='text-[15.5px] py-1.5 whitespace-pre-wrap 
            px-0.5 font-normal'>{c.split(': ')[1]}</div>
          </div>
        ))}
      </div>
      
      <div ref={sortDDInput === 'Oldest' ? (commentsRef) : (null)} 
      className={comments.length > 8 ? (
        'mb-3 w-full mt-1.5 flex items-center justify-center') : (null)}>
        {comments.length > 8 ? (
          <button onClick={backToTop}
          className='w-max h-max bg-green-600 
          pl-4 pr-3 py-1.5
          rounded-full text-[15px]
          text-white flex items-center'>
          <p className='mr-1'>Back to top</p> 
          <svg width="25" height="25" 
            viewBox="0 0 24 24">
            <path fill="currentColor" 
            d="M6.7 11.7q-.275-.275-.275-.7q0-.425.275-.7l4.6-4.6q.15-.15.325-.212q.175-.063.375-.063t.375.063q.175.062.325.212l4.6 4.6q.275.275.287.687q.013.413-.287.713q-.275.275-.7.275q-.425 0-.7-.275L12 7.825L8.1 11.7q-.275.275-.688.288Q7 12 6.7 11.7Zm0 6q-.275-.275-.275-.7q0-.425.275-.7l4.6-4.6q.15-.15.325-.213q.175-.062.375-.062t.375.062q.175.063.325.213l4.6 4.6q.275.275.287.687q.013.413-.287.713q-.275.275-.7.275q-.425 0-.7-.275L12 13.825L8.1 17.7q-.275.275-.688.288Q7 18 6.7 17.7Z"/>
          </svg>
        </button>
        ) : (null)}
        
      </div>
      
    </div>
    </>
    

  )
}

export default Comments