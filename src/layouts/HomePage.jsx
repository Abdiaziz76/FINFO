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
import useAuth from '../hooks/useAuth'
import {IoMdLogOut} from 'react-icons/io'
import { toast, ToastContainer } from 'react-toastify';
import { BsCash } from 'react-icons/bs'



const HomePage = (Component) => function HOC() {
    const location = useLocation();
    const { auth , setAuth} = useAuth();
    console.log('auth', auth)
    

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
            link: '/gptchat',
        },
        // {
        //     icon: <BsClockHistory />,
        //     name: 'history',
        //     link: '/history',
        // },
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

    const handleLogout = (e) => {
        e.preventDefault();
        //confirm toast
            toast.success("Logout Successful");
        
        // Clear refresh token from local storage
        localStorage.removeItem("refresh");
        // Clear access token from context
        setAuth(null);
    
        window.location.reload();
      };
  return (
    <div className="flex border dark:border-slate-600 w-full min-h-screen dark:bg-slate-800 bg-slate-100">
        <ToastContainer />
        {/* Sidebar */}
        <div className="hidden md:flex flex-col md:w-48 h-full fixed dark:bg-slate-800 bg-blue-100">
            <div className="flex items-center border-y dark:border-slate-600">
                <Link to={'/'} className="text-blue-600 dark:text-blue-400 font-bold justify-center px-5 w-full text-2xl mb-2 flex gap-2 items-center text-center"><BsCash />FININFO</Link>
            </div>
            <div className="flex flex-col gap-2 p-2">
                {menuItems.map((item, i) => <MenuItem key={i} item={item} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />)}
            </div>

            <div onClick={handleLogout} className="dark:text-slate-200 mx-4 mb-2 mt-auto">
          <a
               
                href=""
                
              >
                 <h6 className="flex items-center dark:text-white font-medium text-sm">
              <IoMdLogOut className="pr-2 text-2xl dark:text-white" /> Logout
            </h6>
            
              </a>
           
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
            <div className="flex items-center justify-end border-b dark:border-slate-600 px-4 py-1 sticky top-0 z-10 bg-slate-100 dark:bg-slate-800 w-full">
                <div className="flex gap-2 items-center">
                    <DarkModeSwitcher />
                    <span className="hidden md:flex text-slate-600 dark:text-white font-medium">{auth?.username}</span>
                    <span className=""><img src={profile} alt="" className="object-cover h-8 w-8 rounded-full overflow-hidden border" /></span>
                    { showMobileMenu ?
                        <span className="flex md:hidden text-slate-600 dark:text-blue-400 text-2xl" onClick={() => setShowMobileMenu(false)}><AiOutlineClose /></span>
                        :
                        <span className="flex md:hidden text-slate-600 dark:text-blue-400 text-2xl" onClick={() => setShowMobileMenu(true)}><FaBars /></span>
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
