import { AiOutlineClose } from "react-icons/ai";
import MenuItem from "./MenuItem";

const MobileMenu = ({ show, setShow, menuItems, setActiveMenu, activeMenu }) => {

    // const isMobile = false;
    const isMobile = true;

    return (
        <div className={`absolute top-0 ${show && isMobile ? 'left-0' : '-left-full' } flex flex-col gap-2 border px-4 z-10
            bg-white dark:bg-slate-800 h-full max-w-3/4 w-full`}>
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

export default MobileMenu