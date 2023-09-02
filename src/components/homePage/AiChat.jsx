import { useState } from 'react'
import { BiMicrophone, BiSend, BiMessageRoundedAdd, BiShare, BiSolidDownload, BiLike, BiDislike } from 'react-icons/bi'
import { BsFillChatQuoteFill } from 'react-icons/bs'
import { profile } from '../../assets/images'
import ChatHeader from './ChatHeader'

const InputPrompt = () => {
  return (
    <div className="flex flex-col md:flex-row gap-2 items-center py-2 pr-8 mt-4 fixed bg-white dark:bg-slate-800 bottom-2 md:max-w-[1050px] w-full">
        <div className="flex gap-2 items-center p-2 px-4 w-full md:w-3/4 border dark:border-slate-600 rounded-md">
          <input type="text" className="w-full px-2 text-slate-600 dark:text-slate-200 bg-transparent focus:outline-none" />
          <span className="text-slate-600 dark:text-slate-200 transition-colors hover:text-blue-700 dark:hover:text-slate-500 text-xl"><BiMicrophone /></span>
          <span className="text-slate-600 dark:text-slate-200 transition-colors hover:text-blue-700 dark:hover:text-slate-500 text-xl"><BiSend /></span>
        </div>
        <div className="flex ">
          <span className="border dark:border-transparent p-2 rounded-md bg-blue-600 text-white transition-colors
            hover:bg-blue-900 cursor-pointer flex items-center gap-2 ">
            <span className=""><BiMessageRoundedAdd /></span>Switch to new topic
          </span>
        </div>
      </div>
  )
}

const Prompt = () => {
  return (
    <div className="flex mt-2 justify-end">
      <div className="flex items-center gap-2 p-1 px-3 bg-gray-200 dark:bg-gray-400 rounded-md">
        {/* <span className="text-start">sample prompt or question Lorem ipsum dolor sit amet consectetur adipisicing elit. Est doloremque ad porro laudantium explicabo veritatis ipsa ut exercitationem adipisci dolor rem laborum, dolore excepturi eius in ratione assumenda quisquam obcaecati!</span> */}
        <span className="text-start">sample prompt or question Lorem ipsum dolor sit in ratione assumenda quisquam obcaecati!</span>
        <span className="w-16 flex items-center justify-end"><img src={profile} alt="" className="object-cover w-8 h-8 rounded-full overflow-hidden border" /></span>
      </div>
    </div>
  )
}

const Response = () => {
  return (
    <div className="flex flex-col gap-2 mt-2 justify-start border dark:border-slate-600 rounded-md">
      <div className="flex items-center justify-between p-2">
        <span className="bg-blue-600 border p-2 rounded-full border-blue-100"><BsFillChatQuoteFill className="text-white" /></span>
        <div className="flex gap-2 text-blue-600 dark:text-slate-500 transition-colors">
          <span className="hover:text-blue-900 cursor-pointer"><BiLike /></span>
          <span className="hover:text-blue-900 cursor-pointer"><BiDislike /></span>
          <span className="hover:text-blue-900 cursor-pointer"><BiShare /></span>
          <span className="hover:text-blue-900 cursor-pointer"><BiSolidDownload /></span>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-1 px-3">
        <span className="text-start text-slate-500 dark:text-slate-400 font-medium">Sample response header, usually a summary of the question/request</span>
        <span className="text-start dark:text-slate-300">sample response: Lorem ipsum dolor sit amet consectetur adipisicing elit. Est doloremque ad porro laudantium explicabo veritatis ipsa ut exercitationem adipisci dolor rem laborum, dolore excepturi eius in ratione assumenda quisquam obcaecati!</span>
        {/* <span className="text-start">sample prompt or question Lorem quisquam obcaecati!</span> */}
      </div>
    </div>
  )
}

const AiChat = () => {

  const [isEmpty, setIsEmpty] = useState(false) // only show the header if prompting hasn't started...

  return (
    <div className="flex flex-col p-4 overflow-hidden relative h-full pb-32">
      { isEmpty &&
        <ChatHeader />
      }
      {/* Requests/Questions & Responses */}
      <div className="flex flex-col gap-2">
        {
          [1,2,3,4].map((req, i) =>
          <div key={i}>
            <Prompt />
            <Response />
          </div>)
        }
      </div>
      {/* prompting */}
      <InputPrompt />
    </div>
  )
}

export default AiChat
