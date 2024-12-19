import React from 'react'
import { useDispatch } from 'react-redux'
import { SearchQuery } from '../Redux/StudentSlice'

const Header = () => {
  const dispatch = useDispatch()

  return (
    <header className="h-16 bg-white shadow-md flex items-center px-6 justify-between">
    <div>
     <i class="fa-solid fa-magnifying-glass mr-2"></i>
      <input onChange={(e)=>dispatch(SearchQuery(e.target.value))}
        type="text"
        placeholder='Search your course'
        className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="flex items-center space-x-8">
    <span className="text-gray-500"><i class="fa-solid fa-question"></i></span>
    <span className="text-gray-500"><i class="fa-solid fa-message"></i></span>
    <span className="text-gray-500"><i class="fa-solid fa-sliders"></i></span>
      <span className="text-gray-500"><i class="fa-solid fa-bell"></i></span>
      <img
        src="https://i.pravatar.cc/150?img=45"
        alt="Profile"
        className="w-10 h-10 rounded-full"
      />
      <span className="font-semibold text-gray-700">Adeline H. Dancy</span>
    </div>
  </header>
  )
}

export default Header