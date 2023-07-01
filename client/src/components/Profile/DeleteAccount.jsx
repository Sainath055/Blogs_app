import React,{ useState } from "react";

const DeleteAccount = () => {

  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <button className="w-max h-max flex text-[16px] captalize px-3 py-1.5 rounded-md 
              border border-gray-600 font-medium text-gray-600       
              hover:text-red-600 hover:border-red-500 hover:bg-red-100"
        onClick={() => setShowPopup(true)}>
        Delete Account
      </button>
      {showPopup ? (
        <>
          <div className="justify-center items-center 
          flex overflow-hidden backdrop-blur-sm 
          cursor-default
          fixed inset-0 z-40 bg-black/50">
            <div className="relative w-auto pt-1
            mx-auto max-w-sm items-center 
            flex justify-center
            bg-red-500 rounded-lg">
            {/*icon*/}
            <div className="w-[70px] h-[70px]
            z-40 rounded-full items-center
            flex justify-center
            bg-red-500 absolute -top-8">
                <svg className="fill-current w-7 h-7
                    text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20">
                    <path d="M6 2l2-2h4l2 
                    2h4v2H2V2h4zM3 6h14l-1 
                    14H4L3 6zm5 2v10h1V8H8zm3 
                    0v10h1V8h-1z"/>
                </svg>
            </div>
            {/*icon*/}
              {/*content*/}
              <div className="border-0 rounded-b-md
              rounded-t-sm 
              shadow-lg relative flex flex-col w-full
               bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center 
                justify-center p-5 pt-8">
                  <h3 className="text-3xl
                  font-semibold">
                  Delete Account?
                  </h3>
                </div>
                {/*body*/}
                <div className="relative px-6
                text-16 text-gray-500 text-left
                w-full h-max ">
                Be advised, account deletion is final. 
                There will be no way to restore your account.
                You'll permanently loose your Profile & Posts.
                </div>
                {/*footer*/}
                <div className="flex items-center my-4 p-3
                    justify-evenly ">
                  <button onClick={() => setShowPopup(false)}
                    className='flex items-center w-max
                    px-4 py-2 rounded-md duration-75 ease-in
                    text-14 text-white
                    border-[1px] font-semibold
                    bg-blue-600 hover:bg-blue-500'>
                    Nevermind
                  </button>
                  <button onClick={() => setShowPopup(false)}
                    className='flex items-center w-max
                    px-4 py-2 rounded-md duration-75 ease-in
                    bg-gray-50 hover:bg-red-50
                    text-14 border-[1px] font-semibold
                    border-gray-300 hover:border-red-400'>
                    Delete my account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default DeleteAccount;