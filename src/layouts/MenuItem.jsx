import { Link } from "react-router-dom"

export const MenuItem = ({ item, activeMenu, setActiveMenu }) => {
    return (
        <Link  to={item.link} className={`flex gap-2 items-center px-4 py-2 ${activeMenu === item.name && 'bg-blue-400 dark:bg-slate-500 text-blue-100'} rounded-md dark:text-slate-300 text-slate-700
                transition-colors cursor-pointer hover:text-blue-100 hover:bg-blue-400 dark:hover:bg-slate-500 `}
                onClick={() => setActiveMenu(item.name)}
            >
                
                <span className="dark:text-blue-300 text-blue-700 hover:text-blue-100 font-bold text-xl">{item.icon}</span>  
               <span className="font-medium">{item.name}</span>
              
           

            </Link>
    )
}

export default MenuItem