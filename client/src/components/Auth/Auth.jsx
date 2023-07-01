import React,{ useState } from 'react';

import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";

import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { signup, signin } from '../../actions/auth';

const initialState = { firstName: '',lastName: '', 
email: '', password: '',confirmPassword: '' }

const Auth = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevshowPassword) =>
    !prevshowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(isSignup) {
      if(formData.password === formData.confirmPassword) {
        dispatch(signup(formData, history))
      } else {
        alert(`Passwords doesnot match.`)
      }
    }else {
      dispatch(signin(formData, history))
    }
  };
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value })
  };

  const switchMode = () => {
    setIsSignup((previsSignup) =>
    !previsSignup);
    setShowPassword(false);
  };

  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const resultAll = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            "Authorization": `Bearer ${tokenResponse.access_token}`
          }
        })
        
      const result = resultAll.data;
      const token = result.sub;
      const glogInTime = new Date().getTime();

      try {
        dispatch({ type: 'AUTH', data: {result, token, glogInTime} });
        history.push('/');
      } catch (error) {
        console.log(error)
      }
    },
    onError: () => console.log('Login Failed'),
  });

  return (
    <>
    <div className='w-full h-full
    flex justify-center items-center '>
      <div className='bg-[#f4f5f7] flex flex-col 
        duration-100 ease-linear
        items-center sm:shadow-lg sm:rounded-lg
        sm:w-[400px] w-full p-6 h-max sm:mt-5'>

          <h2 className="font-bold text-2xl
          text-gray-900">
            { isSignup ? 'Sign Up' : 'Sign In' }
          </h2>
          
          <form onSubmit={handleSubmit}
          className="flex flex-col mt-4
          gap-5 items-center w-full">

            { isSignup && (
              <div className='flex justify-between
                items-center w-full'>
                <input onChange={handleChange}
                  className="shadow text-gray-700
                  border-solid border-gray-300 
                  focus:outline-none focus:border-blue-600
                  rounded border w-[47%] px-3 py-1.5 capitalize" 
                  type="text" name="firstName" 
                  placeholder="First Name" required/>

                <input onChange={handleChange}
                  className="shadow text-gray-700
                  border-solid border-gray-300 
                  focus:outline-none focus:border-blue-600
                  rounded border w-[47%] px-3 py-1.5 capitalize" 
                  type="text" name="lastName" 
                  placeholder="Last Name" required/>
              </div>
              )}
            
              <input onChange={handleChange}
              className="shadow text-gray-700
              border-solid border-gray-300 
              focus:outline-none focus:border-blue-600
              rounded border w-full px-3 py-1.5 lowercase" 
              type="email" name="email" 
              placeholder="Email" required/>

              <div className='w-full relative'>
                <input onChange={handleChange}
                className="shadow text-gray-700
                border-solid border-gray-300 
                focus:outline-none 
                focus:border-blue-600
                rounded border w-full px-3 py-1.5" 
                type={showPassword ? "text" : "password"}
                name="password" placeholder="Password" 
                required minLength='6' />
                {showPassword ? 
                <AiOutlineEyeInvisible
                onClick={handleShowPassword}
                className='absolute top-2 right-2.5
                cursor-pointer text-gray-500 text-xl 
                hover:text-gray-800 duration-100 ease-in'
                /> : <AiOutlineEye
                onClick={handleShowPassword}
                className='absolute top-2 right-2.5
                cursor-pointer text-gray-500 text-xl 
                hover:text-gray-800 duration-100 ease-in'
                />}
              </div>

              { isSignup && 
              <div className='w-full relative'>
                <input onChange={handleChange}
                className="shadow text-gray-700
                border-solid border-gray-300 
                focus:outline-none 
                focus:border-blue-600
                rounded border w-full px-3 py-1.5" 
                type="password"
                name="confirmPassword" placeholder="Confirm Password" 
                required minLength='6' />
              </div>}
              

              <button type='submit'
              className="bg-blue-600 rounded 
              hover:bg-blue-700 ease-in w-full
              font-medium text-xs shadow-md uppercase
              text-white py-2.5 px-6 duration-100">
                { isSignup ? 'Sign Up' : 'Sign In' }
              </button>
              
          </form>

          <div className="mt-4 flex justify-center
          items-center text-gray-400 w-full">
            <div className="bg-gray-400
              w-full h-[1px]" ></div>
            <p className="text-center text-sm
              mx-2">or</p>
            <div className="bg-gray-400
            w-full h-[1px]" ></div>
          </div>

          <button onClick={() => login()}
            className="bg-white border py-2 w-full
            hover:bg-sky-50/50 hover:border-blue-300/70
            rounded mt-4 flex justify-center items-center 
            shadow duration-100
            text-sm border-gray-400 ease-in text-gray-800">
            <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
            { isSignup ? 'Sign up with Google' 
            : 'Sign in with Google' }
          </button>
                    
          <div className="mt-4 text-xs flex justify-center items-center ">
            <p className='text-gray-800'>
            { isSignup ? "Already have an account?" 
            : "Don't have an account?" }
              
            </p>
            <button onClick={switchMode}
            className="text-blue-700 ml-0.5 cursor-pointer
            hover:underline">
              { isSignup ? 'Sign In' : 'Sign Up' }
            </button>
          </div>

          <div className="mt-4 text-[16px] text-gray-700 flex flex-col justify-center items-center
          w-full h-max bg-[#e4e0e0] rounded-md p-3">
            <p className='text-[18px] text-gray-800'>Test Credentials</p>
            <p>Email: john@gmail.com</p>
            <p>Pass: 123456</p>
            <p>Please dont not alter the data too much</p>
          </div>

      </div>
    </div>
    </>
  )
}

export default Auth