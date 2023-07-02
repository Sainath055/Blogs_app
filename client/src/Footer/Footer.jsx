
import React from 'react'
import { BsDribbble, BsGithub, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'

import { FaCodepen } from 'react-icons/fa'


const Footer = () => {
  return (
    <>
    <div className='w-full h-max bg-[#fafafb] px-4 pt-6 pb-8 shadow border-t border-gray-300
    flex flex-col items-center gap-y-7 z-20'>

      <div className='sm:w-[95%] w-full h-max flex items-center  
      text-[25px] text-gray-700 gap-x-4'>
        <a href='https://github.com/Sainath055' 
        target='_blank' 
        className='w-max h-max cursor-pointer hover:text-blue-600'>
          <BsGithub />
        </a>
        <a href='https://twitter.com/SainathReddy055' 
        target='_blank' 
        className='w-max h-max cursor-pointer hover:text-blue-600'>
          <BsTwitter />
        </a>
        <a href='https://www.instagram.com/sainathreddy055' 
        target='_blank' 
        className='w-max h-max cursor-pointer hover:text-blue-600'>
          <BsInstagram />
        </a>
        <a href='https://www.linkedin.com/in/sainath-reddy-0871b724b/' 
        target='_blank' 
        className='w-max h-max cursor-pointer hover:text-blue-600'>
          <BsLinkedin />
        </a>
        <a href='https://dribbble.com/Sainath_Reddy055' 
        target='_blank' 
        className='w-max h-max cursor-pointer hover:text-blue-600'>
          <BsDribbble />
        </a>
        <a href='https://codepen.io/sainath055' 
        target='_blank' 
        className='w-max h-max cursor-pointer hover:text-blue-600'>
          <FaCodepen />
        </a>
      </div>

      <div className='sm:w-[95%] w-full h-max text-[14px] flex flex-col gap-y-1'>
        <p className='text-[15px] font-semibold text-gray-600'>Creator</p>
        <p className='text-[14px] text-gray-600'>
          Hello, I'm Sainath Reddy. This project showcases my dedication and skills 
          in building user-centric and accessible web applications. 
        </p>
        <p className='text-[14px] text-gray-600'> 
          I am currently seeking for new opportunities, and I'm eager 
          to contribute my skills and creativity to a dynamic team. If you're 
          interested in exploring more of my work and learning about how I 
          can add value to your organization, please visit my <a 
          href='https://sainath055.github.io/' 
          target='_blank'
          className='w-max underline text-gray-600
          hover:text-blue-600 text-[14px] font-semibold'>
            portfolio website</a>. Let's connect and create something amazing together.
        </p>
        <p className='text-[14px] text-gray-600'>
              E-mail - <a href='mailto:nathsai055@gmail.com' 
              className='w-max underline 
              hover:text-blue-600 text-[14px] font-semibold'>
                nathsai055@gmail.com</a>
            </p>
      </div>

      <div className='sm:w-[96%] w-full h-[0.8px] bg-gray-400'></div>

      <div className='sm:w-[95%] w-full h-max text-[14px] flex flex-col gap-y-1'>
        <p className='text-[15px] font-semibold text-gray-600'>Project Summary</p>
        <p className='text-[14px] text-gray-600'>
          Blogs - A full stack MERN application, with Seamless Mobile Responsiveness. 
          Users can comfortably access and interact with 
          the platform's features, including creating, reading, updating, and deleting blog 
          posts, authenticating with credentials or Google, searching for posts, searching posts with tags,  
          saving favorites, and engaging in vibrant discussions through comments. This mobile 
          responsiveness ensures that users can enjoy the full functionality 
          of the application anytime, anywhere.
        </p>
        <p className='text-[14px] text-gray-700'>
          Project source code - <a href='https://github.com/Sainath055/Blogs_app' 
          target='_blank'
          className='w-max underline hover:text-blue-600 '>Github</a>
        </p>
      </div>

    </div>
    </>
  )
}

export default Footer