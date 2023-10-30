// import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import HistoryItem from "./HistoryItem";

const MobileHistory = ({ setShowHistory, history, setCurrentConversation}) => {
  return (
    <div className="absolute top-0 flex gap-4 flex-col w-full p-2 h-full text-slate-200 z-10 bg-white dark:bg-slate-800">
        <div className="flex justify-end items-center p-2">
            <AiOutlineClose onClick={() => setShowHistory(false)} />
        </div>
        <div className="flex flex-col gap-2 justify-start">
            {history?.map(item => <HistoryItem key={item} item={item} setCurrentConversation={setCurrentConversation} />)}
        </div>
    </div>
  )
}

export default MobileHistory
