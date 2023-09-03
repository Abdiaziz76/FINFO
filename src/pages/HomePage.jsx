// import React from 'react'
import { useState } from 'react'
import { BsBook, BsChat, BsClockHistory } from 'react-icons/bs'
import { BiLike } from 'react-icons/bi'
import { CiUser } from 'react-icons/ci'
import DarkModeSwitcher from '../components/DarkModeSwitch'
import { Link } from 'react-router-dom'
import { FaBars, FaBookReader } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'

import AiChat from '../components/homePage/AiChat'
import UserProfile from '../components/homePage/UserProfile'
import History from '../components/homePage/History'

import {profile} from '../assets/images/'
import Recommendations from '../components/homePage/Recommendations'
import LessonsCatalog from '../components/homePage/Lessons'

const MenuItem = ({ item, activeMenu, setActiveMenu, }) => {
    return (
        <div className={`flex gap-2 items-center px-4 py-1 ${activeMenu === item.name && 'bg-slate-200 dark:bg-slate-500 text-blue-700'} rounded-md dark:text-slate-300 text-slate-700
            transition-colors cursor-pointer hover:text-blue-700 hover:bg-slate-200 dark:hover:bg-slate-500`}
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
                <span className="text-blue-600 font-medium">FININFO</span>
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

    const [activeMenu, setActiveMenu] = useState('Recommendations')
    const [showMobileMenu, setShowMobileMenu] = useState(false)

    const menuItems = [
        {
            icon: <BiLike />,
            name: 'Recommendations',
        },
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
        },
        {
            icon: <BsBook />,
            name: 'Lessons',
        },
    ]
  return (
    <div className="flex border dark:border-slate-600 w-full min-h-screen dark:bg-slate-800">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col md:w-48 h-full fixed">
            <div className="flex items-center border-y dark:border-slate-600 p-2 mb-4">
                <Link to={'/'} className="text-blue-600 font-medium">FINFO</Link>
            </div>
            <div className="flex flex-col gap-2 p-2">
                {menuItems.map((item, i) => <MenuItem key={i} item={item} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />)}
            </div>
        </div>
        <MobileMenu
            show={showMobileMenu}
            setShow={setShowMobileMenu}
            menuItems={menuItems}
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu} 
        />
        {/* Main Page */}
        <div className="flex flex-col border dark:border-slate-600 w-full md:ml-48">
            {/* Header */}
            <div className="flex items-center justify-end border-b dark:border-slate-600 px-4 py-1 sticky top-0 z-10 bg-white dark:bg-slate-800 w-full">
                <div className="flex gap-2 items-center">
                    <DarkModeSwitcher />
                    <span className="hidden md:flex text-slate-600 dark:text-white font-medium">Jane Doe</span>
                    <span className=""><img src={profile} alt="" className="object-cover h-8 w-8 rounded-full overflow-hidden border" /></span>
                    { showMobileMenu ?
                        <span className="flex md:hidden text-slate-600 text-2xl" onClick={() => setShowMobileMenu(false)}><AiOutlineClose /></span>
                        :
                        <span className="flex md:hidden text-slate-600 text-2xl" onClick={() => setShowMobileMenu(true)}><FaBars /></span>
                    }
                </div>
            </div>
            {/* Actual main */}
            <div className="flex flex-col gap-2 m-2 h-full rounded-sm">
            {   
                activeMenu === 'Recommendations' ?
                 <Recommendations /> :
                activeMenu === 'AI Chat' ?
                 <AiChat />
                : activeMenu === 'History' ?
                 <History />
                : activeMenu === 'Lessons' ?
                    <LessonsCatalog />
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
