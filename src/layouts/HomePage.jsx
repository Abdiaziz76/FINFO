// import React from 'react'
import { useState } from 'react'
import { BsBook, BsChat, BsClockHistory } from 'react-icons/bs'
import { BiLike } from 'react-icons/bi'
import { CiUser } from 'react-icons/ci'
import DarkModeSwitcher from '../components/DarkModeSwitch'
import { Link } from 'react-router-dom'
import { FaBars, FaBookReader } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import {profile} from '../assets/images'
import MobileMenu from './MobileMenu'
import MenuItem from './MenuItem'
import { useLocation } from 'react-router-dom'



const HomePage = (Component) => function HOC() {
    const location = useLocation();

//drop the slash before the pathname to get activemenu
const path = location.pathname.slice(1);


    const [activeMenu, setActiveMenu] = useState(path)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    console.log('activeMenu', activeMenu)

    const menuItems = [
        {
            icon: <BiLike />,
            name: 'recommendations',
            link: '/recommendations',
        },
        {
            icon: <BsChat />,
            name: 'chat',
            link: '/chat',
        },
        {
            icon: <BsClockHistory />,
            name: 'history',
            link: '/history',
        },
        {
            icon: <CiUser />,
            name: 'profile',
            link: '/profile',
        },
        {
            icon: <BsBook />,
            name: 'lessons',
            link: '/lessons',
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
            <main className="flex flex-col gap-2 m-2 h-full rounded-sm">
            <Component />
            </main>
            {/* <span className="">Main</span> */}
        </div>
    </div>
  )
}

export default HomePage
