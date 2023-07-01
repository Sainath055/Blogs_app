import React from 'react'

import './MiniCircleLoader.css'

const MiniCircleLoader = () => {
  return (
    <>
    <svg
        className="min_ring"
        viewBox="25 25 50 50"
        strokeWidth={5}>
        <circle cx="50" cy="50" r="20" />
    </svg>
    </>
  )
}

export default MiniCircleLoader