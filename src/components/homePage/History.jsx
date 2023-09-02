// import React from 'react'

import { useState } from "react"
import ChatHeader from "./ChatHeader"
import { profile } from '../../assets/images'
import { BsFillChatQuoteFill } from 'react-icons/bs'

const SummaryItem = ({ item }) => {
  return (
    <div className="flex gap-2 items-center p-2 rounded-md transition-colors hover:bg-slate-200 dark:hover:bg-blue-500 cursor-pointer">
      <span className="">
        <img src={profile} alt="" className="h-8 w-8 overflow-hidden object-cover rounded-full" />
      </span>
      <div className="flex flex-col gap-.5 text-sm md:text-md">
        <span className="text-slate-600 dark:text-slate-200 font-medium text-start">Lorem ipsum, dolor sit amet consectetur adipisicing elit...</span>
        <span className="flex items-center gap-4 text-slate-500 dark:text-slate-300">
          <span className="">24 Questions asked</span>
          <span className="flex items-center gap-2"><span className="w-1 h-1 bg-white rounded-full"></span>2 mins ago</span>
        </span>
      </div>
    </div>
  )
}

const History = ({ setActiveMenu }) => {

  // const [isEmpty, setIsEmpty] = useState(true)
  const [isEmpty, setIsEmpty] = useState(false)

    return (
      <div className="flex flex-col gap-8 dark:text-slate-200 h-full">
         <ChatHeader />
         {/* Summary */}
         <div className="flex flex-col gap-2 border dark:border-slate-600 rounded-md p-2 md:p-4">
          <div className="flex items-center justify-between capitalize">
            <span className="font-medium text-slate-600 dark:text-slate-200">Search History</span>
            {!isEmpty &&  <span className="text-slate-400 dark:text-slate-200 px-3 py-1 bg-slate-200 transition-colors
              dark:bg-gray-500 rounded-2xl cursor-pointer hover:text-blue-600 dark:hover:text-blue-700">Clear Chat History</span>
            }
          </div>
          <div className="flex flex-col gap-2 flex-wrap h-full">
            { isEmpty ?
              <div className="flex flex-col gap-4 items-center justify-center py-16">
                <span className="bg-blue-600 border p-4 rounded-full border-blue-100">
                  <BsFillChatQuoteFill className="text-white text-2xl" /></span>
                <div className="flex flex-col gap-2">
                <span className="font-medium text-lg text-slate-600 dark:text-slate-300">No questions added</span>
                <span className="text-slate-600 dark:text-slate-400">To type your questions,
                  <span className="underline transition-colors hover:text-blue-600 pl-1 cursor-pointer" onClick={() => setActiveMenu('AI Chat')}>go to Chat</span>
                </span>
                </div>
              </div>
              :
              <>
              {/* Summary Items */}
              <div className="flex flex-wrap gap-2 py-4">
                {[1,2,3,4].map((item, i) =>  <SummaryItem key={i} item={item} />
                )}
              </div>
              </>
            }
          </div>
         </div>
      </div>
    )
  }
  
  export default History
  