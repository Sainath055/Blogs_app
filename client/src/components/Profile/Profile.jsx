import React,{useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';


import { getPosts } from '../../actions/posts'
import DeleteAccount from './DeleteAccount';

const Profile = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [editProfile, setEditProfile] = useState(false);

  const switchToEdit = () => {
    setEditProfile((preveditProfile) =>
    !preveditProfile);
  };

  const user = JSON.parse(localStorage.getItem('profile'));

  const currentPath = location.pathname;

  useEffect(() =>{
    if(currentPath === '/profile'){
      dispatch(getPosts())
    }
  }, [dispatch]);


  return (
    <>
    <div className='w-full flex flex-col'>
        <div className='w-full h-max sm:my-12 my-6
          flex sm:flex-row flex-col sm:p-0 px-6
          justify-center sm:items-center '>

          <div className='sm:w-120 sm:h-120 
            mr-4 w-80 h-80
            rounded-full bg-violet-800
            flex justify-center items-center '>
              <p className='w-max h-max
              text-white text-[40px] uppercase'>
                  {user.result.name.charAt(0)}
              </p>
          </div>

          <div className='h-max w-max sm:ml-4
          sm:mt-0 mt-2 flex flex-col justify-between'>
            <p className='font-bold 
            sm:text-[32px] text-24'>
              {user.result.name}</p>
            <p className='text-16
            text-[#616163]
            font-normal mt-2'>
              {user.result.email}</p>

          </div>
        </div>  
{/* 
        <div className='w-full h-max 
          flex justify-center'>
            <DeleteAccount />
        </div>       */}

    </div>
    </>
  )
}

export default Profile;