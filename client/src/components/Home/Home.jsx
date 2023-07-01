import React, {useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination';
import Posts from '../Posts/Posts';
import Search from '../Search/Search';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({setCurrentId}) => {
  
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [tags, setTags] = useState([]);

  const location = useLocation();

  const currentPath = location.pathname;

  const {posts} = useSelector((state) => state.posts);
  
  return ( 
    <>
    <div className='w-full h-max min-h-screen block relative '>
        <div className='w-full h-max 
        flex bg-blue-500
        items-center justify-center '>
          <Search  
          tags={tags}
          setTags={setTags} />
        </div>

        <Posts setCurrentId={setCurrentId} />
        
        {(!searchQuery && !tags.length) && (
          <Pagination page={page} />
        )}
    </div>
    </>
  )
}

export default Home