import React from 'react';

import './LoaderCircle.css'

const LoaderCircle = () => {
  return (
    <>
    <svg
        className="ring"
        viewBox="25 25 50 50"
        strokeWidth={4}>
        <circle cx="50" cy="50" r="20" />
    </svg>
    </>
  )
}

export default LoaderCircle