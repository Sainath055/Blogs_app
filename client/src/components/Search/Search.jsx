import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { BiSearch } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";

import './Search.css';

import { getPostsBySearch } from '../../actions/posts'

const Search = ( { tags, setTags } ) => {

    const [searchVal, setSearchVal] = useState('');
    
    const [tagVal, setTagVal] = useState('');
    const [searchForTags, setSearchForTags] = useState(false);
    
    const dispatch = useDispatch();
    const history = useHistory();
    
    const searchPost = () => {
        if (searchVal.trim() || tags) {
            dispatch(getPostsBySearch({ searchVal, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${searchVal || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/');
        }
    };

    const searchKeyDown = (e) => {
        if (e.keyCode === 13) {
        searchPost();
        }
    };

    const tagKeyDown = (e) => {
        var tag = e.target.value
        if (e.keyCode === 13 && tag.length > 0) {
            setTags([...tags, tag])
            setTagVal('')
        }
    }

    const tagDel = (currentTag) => {
        setTags(tags.filter((tag) => tag !== currentTag))
    }

    const changeToTagSearch = event => {
        if (event.target.checked) {
            setSearchForTags((prevsearchForTags) =>
            !prevsearchForTags);
        } else {
            setSearchForTags((prevsearchForTags) =>
            !prevsearchForTags);
        }
    };

    const uniqueTags = tags.filter((val,id,array) => array.indexOf(val) == id)

  return (
    <>
    <div className='w-full min-h-[180px] overflow-hidden 
        flex flex-col items-center justify-center '>
        <div className={'flex h-[60px] '+
            'xl:w-[60%] md:w-[80%] sm:w-[90%] w-[95.5%] '+
            'bg-white items-center justify-between '+
            (tags.length > 0 ? ('rounded-t-3xl') :
            (' rounded-3xl'))}>

            <div className='h-full w-max sm:pl-3 pl-2 
            flex items-center justify-center'>
                <BiSearch className='text-gray-500
                text-[24px] '/>
            </div>

            <div className='relative flex w-full
            items-center justify-center'>

                <input 
                onChange={(e)=>setSearchVal(e.target.value)}
                onKeyDown={searchKeyDown}
                className={'w-full '+
                'text-gray-500 '+
                'outline-none px-3 py-3 text-16 '+
                (searchVal.length > 0 ? (
                    ' text-gray-800 '
                ) : (null)) +
                (searchForTags ? 
                (' hidden ') : (' block')) }
                value={searchVal}
                type='text' name="search" 
                placeholder="Search..."/>

                <input 
                onChange={(e) => setTagVal(e.target.value.toLowerCase())}
                onKeyDown={tagKeyDown}
                className={'w-full '+
                'text-gray-500 focus:text-gray-800 '+
                'outline-none px-3 py-3 text-16 lowercase'+
                (tagVal.length > 0 ? (
                    ' text-gray-800 '
                ) : (null)) +
                (searchForTags ? 
                (' block ') : (' hidden')) }
                value={tagVal}
                type='text' name="tagsearch" 
                placeholder="Enter tag and hit enter..."/>
       
                
                {searchVal.length > 0 ? (
                    (searchForTags ? (null) : (
                    <div className='w-max h-full bg-white
                    absolute right-0 flex pr-2.5 pl-1
                    items-center justify-center'>
                        <IoCloseSharp 
                        onClick={()=> setSearchVal('')}
                        className='text-18
                        text-white bg-gray-400
                        rounded-full p-[1px]
                        cursor-pointer'/>
                    </div>  
                    ))
                ) : (
                    null
                )}
            </div>

            <div className='w-max h-full mr-3 
            flex items-center justify-center'>
                <div className="toggle mr-2">
                    <input onChange={changeToTagSearch}
                    name='tags_check'
                    type="checkbox"/>
                    <label></label>
                </div>
                <p className={' text-16 '+
                    ' w-max h-full '+
                    'flex items-center justify-center '+
                    (searchForTags ? (
                        ' text-gray-700') 
                        : (' text-gray-400'))
                    }>
                   tags  
                </p>
            </div>
            
            <button onClick={searchPost}
            className='w-max h-max text-16 text-white
            md:px-4 md:py-2 p-3
            bg-green-500 rounded-full mr-2
            flex items-center justify-center' >
                <p className='md:block hidden'>
                   Search  
                </p>
                <BsArrowRight className='text-18
                md:hidden block'/>
            </button>

        </div>

        <div className={'w-full min-h-[50px] '+ 
        'xl:w-[60%] md:w-[80%] sm:w-[90%] w-[95.5%] '+
        'bg-white top-[60px] '+
        'rounded-b-3xl px-4 py-2 overflow-hidden '+
        'items-center justify-start flex-wrap '+
        (tags.length > 0 ? ('flex') : ('hidden'))}>
            {uniqueTags.map((tag, i) => {
                return <span key={i}
                className='bg-gray-200 mr-2 w-max
                text-16 rounded-3xl text-gray-700
                pl-3 pr-2 py-1 flex my-1
                items-center justify-center' >
                    {tag}
                    <IoCloseSharp 
                    onClick={() => tagDel(tag)}
                    className='text-16 ml-1
                    text-white bg-gray-400
                    rounded-full p-[1px]
                    cursor-pointer'/>
                </span>
            })}
        </div>


    </div>
    </>
  )
}

export default Search