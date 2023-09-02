// import React from 'react'
import { BiMicrophone, BiSend, BiMessageRoundedAdd } from 'react-icons/bi'
import { profile } from '../../assets/images'

const InputPrompt = () => {
  return (
    <div className="flex flex-col md:flex-row gap-2 items-center p-4 absolute bottom-2 w-full">
        <div className="flex gap-2 items-center p-2 px-4 w-3/4 border rounded-md">
          <input type="text" className="w-full px-2 text-slate-600 focus:outline-none" />
          <span className="text-slate-600 transition-colors hover:text-blue-700 text-xl"><BiMicrophone /></span>
          <span className="text-slate-600 transition-colors hover:text-blue-700 text-xl"><BiSend /></span>
        </div>
        <div className="flex ">
          <span className="border p-2 rounded-md bg-blue-600 text-white hover:bg-blue-900 cursor-pointer flex items-center gap-2 ">
            <span className=""><BiMessageRoundedAdd /></span>Switch to new topic
          </span>
        </div>
      </div>
  )
}

const Prompt = () => {
  return (
    <div className="flex mt-2 justify-end">
      <div className="flex items-center gap-2 p-1 px-3 bg-gray-200 rounded-md">
        {/* <span className="text-start">sample prompt or question Lorem ipsum dolor sit amet consectetur adipisicing elit. Est doloremque ad porro laudantium explicabo veritatis ipsa ut exercitationem adipisci dolor rem laborum, dolore excepturi eius in ratione assumenda quisquam obcaecati!</span> */}
        <span className="text-start">sample prompt or question Lorem ipsum dolor sit in ratione assumenda quisquam obcaecati!</span>
        <span className="w-16 flex items-center justify-end"><img src={profile} alt="" className="object-cover w-8 h-8 rounded-full overflow-hidden border" /></span>
      </div>
    </div>
  )
}

const Response = () => {
  return (
    <div className="flex mt-2 justify-end">
      <div className="flex p-1 px-3 border rounded-md">
        <span className="text-start">sample prompt or question Lorem ipsum dolor sit amet consectetur adipisicing elit. Est doloremque ad porro laudantium explicabo veritatis ipsa ut exercitationem adipisci dolor rem laborum, dolore excepturi eius in ratione assumenda quisquam obcaecati!</span>
      </div>
    </div>
  )
}

const AiChat = () => {
  return (
    <div className="flex flex-col p-4 relative h-full">
      <div className="flex flex-col gap-2">
        <span className="text-slate-700 font-medium">Get answers to your most pressing finance related questions in seconds</span>
        <span className="text-slate-600 text-sm">Whether its finding your next banker or handling savings, we've got you covered!</span>
      </div>
      {/* Requests/Questions & Responses */}
      <div className="flex flex-col gap-2">
        <Prompt />
        <Response />
      </div>
      {/* prompting */}
      <InputPrompt />
    </div>
  )
}

export default AiChat
