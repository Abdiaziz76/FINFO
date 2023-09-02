// import React from 'react'
import { useState } from 'react'
import { BsChat, BsClockHistory } from 'react-icons/bs'
import { CiUser } from 'react-icons/ci'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'

import AiChat from '../components/homePage/AiChat'
import UserProfile from '../components/homePage/UserProfile'
import History from '../components/homePage/History'

import {profile} from '../assets/images/'

const MenuItem = ({ item, activeMenu, setActiveMenu }) => {
    return (
        <div className={`flex gap-2 items-center px-4 py-1 ${activeMenu === item.name && 'bg-slate-200 text-blue-700'} rounded-md text-slate-700
            transition-colors cursor-pointer hover:text-blue-700 hover:bg-slate-200`}
            onClick={() => setActiveMenu(item.name)}
        >
            <span className="">{item.icon}</span>
            <span className="">{item.name}</span>
        </div>
    )
}

const MobileMenu = ({ show, setShow, menuItems, setActiveMenu, activeMenu }) => {

    // const isMobile = false;
    const isMobile = true;

    return (
        <div className={`absolute top-0 ${show && isMobile ? 'left-0' : '-left-full' } flex flex-col gap-2 border px-4 z-10
            bg-white h-full max-w-3/4 w-full`}>
            <div className="flex items-center border-y p-2 mb-4 relative">
                <span className="text-blue-600 font-medium">FINFO</span>
                <span className="absolute right-2 text-slate-700 transition-colors hover:text-blue-600"
                onClick={() => setShow(false)}
                >
                    <AiOutlineClose />
                </span>
            </div>
           <div className="flex flex-col gap-2">
            {menuItems.map((item, i) => <MenuItem key={i} item={item} setActiveMenu={setActiveMenu} activeMenu={activeMenu} />)}
           </div>
        </div>
    )
}

const HomePage = () => {

    const [activeMenu, setActiveMenu] = useState('AI Chat')
    const [showMobileMenu, setShowMobileMenu] = useState(false)

    const menuItems = [
        {
            icon: <BsChat />,
            name: 'AI Chat',
        },
        {
            icon: <BsClockHistory />,
            name: 'History',
        },
        {
            icon: <CiUser />,
            name: 'Profile',
        }
    ]
  return (
    <div className="flex w-full min-h-screen relative">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col md:w-48 h-full">
            <div className="flex items-center border-y p-2 mb-4">
                <span className="text-blue-600 font-medium">FINFO</span>
            </div>
            <div className="flex flex-col gap-2 p-2">
                {menuItems.map((item, i) => <MenuItem key={i} item={item} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />)}
            </div>
        </div>
        <MobileMenu show={showMobileMenu} setShow={setShowMobileMenu} menuItems={menuItems} setActiveMenu={setActiveMenu} activeMenu={activeMenu}  />
        {/* Main Page */}
        <div className="flex flex-col border w-full">
            {/* Header */}
            <div className="flex items-center justify-end border-b px-4 py-1">
                <div className="flex gap-2 items-center">
                    <span className="hidden md:flex text-slate-600 font-medium">Jane Doe</span>
                    <span className=""><img src={profile} alt="" className="object-cover h-8 w-8 rounded-full overflow-hidden border" /></span>
                    <span className="flex md:hidden text-slate-600 text-2xl" onClick={() => setShowMobileMenu(true)}><FaBars /></span>
                </div>
            </div>
            {/* Actual main */}
            <div className="flex flex-col gap-2 items-center justify-center border m-2 h-full rounded-sm">
            { activeMenu === 'AI Chat' ?
                 <AiChat />
                : activeMenu === 'History' ?
                 <History />
                :
                 <UserProfile />
            }
            </div>
            {/* <span className="">Main</span> */}
        </div>
    </div>
  )
}

export default HomePage
