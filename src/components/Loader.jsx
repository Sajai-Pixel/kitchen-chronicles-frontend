import React from 'react'
import Loading from '../assets/spinner-2.gif'

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-4 bg-white rounded shadow-lg">
        <img src={Loading} className="w-16 h-16" alt="Loading..." />
      </div>
    </div>
  )
}

export default Loader
