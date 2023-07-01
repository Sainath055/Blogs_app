import React,{ useState } from 'react'
import { SlArrowUp } from 'react-icons/sl'
import { SlArrowDown } from 'react-icons/sl'

const SortBtn = ({ sortDDInput, setSortDDInput }) => {

    const [openSort, setOpenSort] = useState(false);

    const dropDown = () => {
        setOpenSort((prevopenSort) =>
        !prevopenSort);
      };

  return (
    <>
    <div className='w-max h-max relative'>
        <button onClick={dropDown}
            className='w-full h-max px-2 py-1  flex items-center'>
            <p className='text-14 font-semibold uppercase'>{sortDDInput}</p>
            {openSort ? (
                <SlArrowUp className='text-[15px] ml-2'/>
            ) : (
                <SlArrowDown className='text-[15px] ml-2 '/>
            )}
        </button>
        {openSort && (
               <div className='w-full h-max absolute
               bg-white rounded drop-shadow
               flex flex-col items-center
               top-full right-0 left-0'>

                <button onClick={() => {
                    setSortDDInput('Newest')
                    dropDown()}}
                className='text-14 my-2 
                text-gray-600 hover:text-green-600'>
                    Newest
                </button>

                <button onClick={() => {
                    setSortDDInput('Oldest')
                    dropDown()}}
                className='text-14 my-2 
                text-gray-600 hover:text-green-600'>
                    Oldest
                </button>

               </div> 
            )}
    </div>
    </>
  )
}

export default SortBtn