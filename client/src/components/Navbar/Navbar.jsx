import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import blog_icon from '../../images/blogging.png'
import AfterLogIn from './AfterLogIn';

import { IoChevronBackSharp } from "react-icons/io5";
import { BiHome } from "react-icons/bi";
import { IoLogInOutline } from "react-icons/io5";
import { FiArrowRightCircle } from 'react-icons/fi';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(
        localStorage.getItem('profile')));

    const dispatch = useDispatch();
    const history = useHistory()
    const location = useLocation();

    const pathname = location.pathname

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;
        const googleExp = user?.glogInTime;

        if (token) {
            if(token.length > 100) {
                const decodedToken = decode(token);
                if (decodedToken.exp * 1000 < new Date().getTime()) logout();
            } else {
                if(googleExp+3300000 < new Date().getTime()) logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
        
    }, [location])


  return (
    <>
    <header className={'w-full h-[70px] top-0 left-0 shadow-md '+ 
        ' sticky right-0 z-30 justify-between flex items-center px-4 gap-x-4 ' +
        (pathname === `/posts` ? ' bg-[#eaecf1] ' : 
        pathname === `/posts/search` ? ' bg-[#eaecf1] ' :' bg-blue-500 ' )}>
        
        <Link to={'/posts'}>
        <div className={'text-[25px] flex items-center justify-center cursor-pointer ' + 
        (pathname === `/posts` ? ' text-[#202020] ' : 
        pathname === `/posts/search` ? ' text-[#202020] ' : ' text-[#f5f5f5] ' )}>
            <img className='w-[30px] h-[30px] mr-1' 
                src={blog_icon}/>
            Blogs
        </div>
        </Link>

        <div>
            {user ? (
                <AfterLogIn setUser={setUser} user={user}/>
            ) : (
            (location.pathname != '/auth' &&
                <a to='/auth' href='/auth'>
                    <button id='signInBtn'
                    className='bg-blue-600 
                    px-3 py-2 font-bold border border-[#eaecf1]
                    flex items-center rounded-lg
                    hover:bg-blue-700
                    text-14 text-white '>
                        Sign In
                        <FiArrowRightCircle className='ml-1
                        text-20'/>
                    </button>
                </a>
                ))}
        </div>
        
      </header>
    </>
  )
}

export default Navbar