// import React from 'react'
import { BsChevronRight } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'

import HomePage from '../layouts/HomePage'
import profile from '../assets/images/profile1.jpg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {

  const navigate = useNavigate()
  const [edit, setEdit] = useState(false)
  const [user, setUser] = useState({
    'location': 'kenya',
    'language': 'english',
    'subscription': 'premium'
  })

    return (
      <div className="dark:text-slate-200 flex justify-center md:mt-8">
        <div className="flex flex-col gap-2 items-center rounded-md shadow-lg dark:shadow-blue-800 md:max-w-[300px] w-full p-4 pb-8">
          {/* header with name/email, username and edit profile action */}
          <div className="flex flex-col gap-8 w-full">
            <div className="flex justify-between items-center w-full">
              <span className="rotate-180" onClick={() => navigate('/chat')}><BsChevronRight className="font-medium text-sm" /></span>
              <span className="font-medium">My profile</span>
              <span className=""></span>
            </div>
            <div className="flex gap-6 items-center">
              <img src={profile} alt="profile" className="w-16 h-16 rounded-full object-cover" />
              <div className="flex flex-col gap-0 text-sm items-start">
                <span className="font-medium">Jane Doe</span>
                <span className="text-slate-500">jane@doe.com</span>
                <span className="mt-2 p-1 bg-blue-800 rounded-md hover:bg-blue-500 text-white cursor-pointer"
                onClick={() => setEdit(!edit)}
                >{edit ? 'save changes' : 'edit profile'}</span>
              </div>
            </div>
          </div>
          {/* body with: location , language and clear history action */}
          <div className="flex flex-col gap-2 w-full mt-8">
            {['location', 'language', 'subscription'].map((item, id) => 
               <div key={id} className="grid grid-cols-2">
               <span className="col-span-1 text-start capitalize font-medium">{item}:</span>
               {edit ? 
                <input
                  type="text"
                  value={user[item]}
                  onChange={(e) => setUser({...user, [item]: e.target.value})}
                  className="border focus:outline-none focus:border-slate-300 text-slate-700 rounded-sm px-1"
                />
                :
                <span className="col-span-1 text-start capitalize">{user[item]}</span>
               }
             </div>
            )}
          </div>
          {/* logout action */}
          <div className="flex w-full mt-8">
            <span className="flex items-center gap-2 hover:text-blue-800 cursor-pointer"><BiLogOut/> Logout</span>
          </div>
        </div>
      </div>
    )
  }
  
  export default HomePage(UserProfile)
  