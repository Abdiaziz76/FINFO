// import React from 'react'

import HomePage from '../layouts/HomePage';
import ChatHeader from "./ChatHeader"

const Recommendations = () => {
    return (
      <div className="dark:text-slate-200">
        <ChatHeader />
        <div className="flex mt-8 flex-col border dark:border-slate-600 p-4 h-full">
          Recommendations
        </div>
      </div>
    )
  }
  
  export default HomePage(Recommendations)
  