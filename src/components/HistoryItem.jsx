// import React from 'react'

const HistoryItem = ({ item, setCurrentConversation }) => {
    // console.log({ item })
  return (
    <div className="flex p-2 transition-colors hover:bg-slate-200 dark:hover:bg-blue-500 cursor-pointer" onClick={() => setCurrentConversation(item.id)}>
        <div className="flex flex-col gap-.5 text-sm md:text-md">
        <span className="text-slate-600 dark:text-slate-200 font-medium text-start">{item.topic.length <= 50 ? item.topic : `${item.topic.slice(0, 50)} ...`}</span>
        <span className="flex items-center gap-4 text-slate-500 dark:text-slate-300">
            <span className="">{item.questions} Questions asked</span>
            <span className="flex items-center gap-2"><span className="w-1 h-1 bg-white rounded-full"></span>2 mins ago</span>
        </span>
        </div>
  </div>
  )
}

export default HistoryItem
