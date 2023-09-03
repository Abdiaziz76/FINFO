import { Link } from "react-router-dom"

export const MenuItem = ({ item, activeMenu, setActiveMenu }) => {
    return (
        <Link  to={item.link} className={`flex gap-2 items-center px-4 py-1 ${activeMenu === item.name && 'bg-slate-200 dark:bg-slate-500 text-blue-700'} rounded-md dark:text-slate-300 text-slate-700
                transition-colors cursor-pointer hover:text-blue-700 hover:bg-slate-200 dark:hover:bg-slate-500`}
                onClick={() => setActiveMenu(item.name)}
            >
                
                <span className="">{item.icon}</span>  
               <span className="">{item.name}</span>
              
           

            </Link>
    )
}

export default MenuItem