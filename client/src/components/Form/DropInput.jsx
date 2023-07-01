import React, { useState } from 'react';
import FileBase from 'react-file-base64';

import './DropInput.css'

import { GoCloudUpload } from "react-icons/go";


const DropInput = ( {setPostData, postData } ) => {

  return (
    <>
    <div className={'sm:w-350 w-[320px] h-250 ' +
        'flex items-center justify-center overflow-hidden ' +
        'relative border-dashed border-[3px] ' +
        'hover:border-gray-700 rounded-2xl ' +
        (postData.selectedFile.length === 0 
            ? 'border-gray-400 ' 
            : ' border-gray-700')}>

    {(postData.selectedFile.length === 0) ? (
        <div className='flex w-full h-full
        flex-col items-center justify-center'>
            <GoCloudUpload className='text-[65px]
            text-gray-700 animate-bounce'/>
            <p className='text-gray-800'>
                Drag & Drop your image
            </p>
            <p className='text-gray-500'>
                (300x150 recommended)
            </p>
        </div>
        ) : (
        <div className="w-350 h-250  p-1.5 bg-gray-100
        flex flex-col items-center justify-evenly
        overflow-hidden ">
            <img className='max-w-[300px] max-h-[160px]'
            src={postData.selectedFile} alt="uploadImg" />

            {/* <div className='flex w-[80%] text-16
            items-center justify-center'>
                <p className='truncate
                max-w-[50%]  pr-1'>
                    {imgPreview.name}
                </p>
                <p className=' pl-1'>
                    ({imgPreview.size})
                </p>
            </div> */}
            <p className='text-14 text-gray-500'>
                Click to choose different 
                image or drag and drop</p>
        </div>
        )}

        <div className='FileBase_Input opacity-0  
        w-full h-full absolute ' >
        <FileBase
            type="file" multiple={false}
            onDone={({ base64 }) => {
                     setPostData({
                     ...postData, selectedFile: base64
                    })
                    }} 
            />
        </div>
    </div>


    </>
  )
}

export default DropInput;