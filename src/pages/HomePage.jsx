// import React from 'react'
import { useState } from 'react'
import { BsChat, BsClockHistory } from 'react-icons/bs'
import { CiUser } from 'react-icons/ci'
import DarkModeSwitcher from '../components/DarkModeSwitch'
import { Link } from 'react-router-dom'

const MenuItem = ({ item, activeMenu, setActiveMenu }) => {
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

const HomePage = () => {

    const [activeMenu, setActiveMenu] = useState('AI Chat')

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
    <div className="flex border  dark:border-slate-500 w-full min-h-screen dark:bg-slate-800">
        {/* Sidebar */}
        <div className="flex flex-col md:w-48 h-full">
            <div className="flex items-center justify-evenly gap-2 border-y  dark:border-slate-500 p-2 mb-4">
                <Link to='/'><span className="text-blue-600 dark:text-blue-400 font-medium">FINFO</span></Link>
                <div className="">
                    <DarkModeSwitcher />
                </div>
            </div>
            <div className="flex flex-col gap-2 p-2">
                {menuItems.map((item, i) => <MenuItem key={i} item={item} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />)}
            </div>
        </div>
        {/* Main */}
        <div className="flex flex-col border dark:border-slate-500 w-full dark:text-white">
            <span className="">Main</span>
        </div>
    </div>
  )
}

export default HomePage
