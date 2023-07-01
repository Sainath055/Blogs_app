import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory,Link, useLocation } from 'react-router-dom';

import { ImArrowUp } from "react-icons/im";
import { TbLogout } from "react-icons/tb";
import { BsFiles } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { IoBookmarksOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { BiHome } from "react-icons/bi";


import './AfterLogIn.css'

const AfterLogIn = ({ user ,setUser }) => {

    const userId = user?.result?.sub || user?.result?._id;

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    }

  return (
    <>
    <div className='flex items-center justify-center gap-x-4'>

        <div id='profile_drop'
            className='w-[40px] h-[40px] 
            rounded-full bg-violet-800 cursor-pointer
            flex justify-center items-center relative'>
                <p className='w-[30px] h-[30px]
                text-white text-[18px] uppercase
                flex justify-center items-center'>
                    {user.result.name.charAt(0)}
                </p>

            <ImArrowUp id='profile_drop_arrow'
            className='text-xl pt-2 px-3
            w-max h-max hidden shadow-xl
            text-white absolute top-[35px]'/>

            <div id='profile_drop_menu'
            className='absolute top-[52px]
            shadow-xl py-3
            hidden rounded-md flex-col
            items-center gap-y-2
            bg-white w-[180px] h-max'>
                
                <a to='/profile' href='/profile'
                className='profile_drop_menu_btns'> 
                    <button className='flex items-center'>
                        <BsPerson className='mr-2'/>
                        Profile
                    </button>
                </a>
        
                <div className='w-full px-[16px]'>
                    <div className='profile_drop_menu_lines'></div>
                </div>

                <Link className='w-full h-max' to={`/myPosts/${userId}`}>
                <button 
                className='profile_drop_menu_btns'> 
                    <BsFiles className='mr-2'/>
                    My Posts
                </button></Link>

                <Link className='w-full h-max' to={`/saved/${userId}`}>
                <button 
                className='profile_drop_menu_btns'>
                    <IoBookmarksOutline className='mr-2'/>
                    Saved
                </button></Link>
                
                <div className='w-full px-[16px]'>
                    <div className='profile_drop_menu_lines'></div>
                </div>
                <button onClick={logout}
                    className='profile_drop_menu_btns'>
                    <TbLogout className='mr-2'/>
                    Sign Out
                </button>
            </div>
        </div>

        {(location.pathname != '/write') ? (
            <a to='/write' href='/write'>
                <button 
                className='bg-green-600 
                px-3 py-2 font-semibold
                flex items-center rounded-lg
                hover:bg-green-700
                text-14 text-white'>
                    <FiEdit className='mr-1
                    text-16'/>
                    Write
                </button>
            </a>
        ): (
            <a to='/posts' href='/posts'>
                <button 
                className='bg-green-600 
                px-3 py-2 font-semibold
                flex items-center rounded-lg
                hover:bg-green-700
                text-14 text-white'>
                    <BiHome className='mr-1
                    text-16'/>
                    Home
                </button>
            </a>
        )}
        
        
    </div>
    </>
  )
}

export default AfterLogIn