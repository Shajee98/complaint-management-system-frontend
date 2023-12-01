import { useState, useEffect } from 'react'
import { AiFillSetting } from "react-icons/ai";
import { MdMessage } from "react-icons/md";
import { GiNotebook} from 'react-icons/gi'
import { SiGoogleanalytics } from "react-icons/si";
import { Link } from 'react-router-dom';
import { LocalStorageKeys, getFromStorage } from '../../../utils/localStorage';
import './Navbar.scss'


const Navbar = () => {
    const [currentUrl, setCurrentUrl] = useState("")
   const handleNavToggle = (url: string) => {
    setCurrentUrl(url)
    }
    useEffect(() => {
        console.log(window.location.href)

        setCurrentUrl(window.location.href)
    }, [])
  return (
    <nav className="navbar_">
        <Link to="/complaints" onClick={() => handleNavToggle('http://localhost:5173/complaints')} className={`nav-item_ ${currentUrl == "http://localhost:5173/complaints" && 'active'}`}>
            <GiNotebook />
            <h1 className='nav-link_'>Complaint Management</h1>
        </Link>
        {getFromStorage(LocalStorageKeys.USER).user.user_type_id != 3 && <Link to="/settings" onClick={() => handleNavToggle('http://localhost:5173/settings')} className={`nav-item_ ${currentUrl == "http://localhost:5173/settings" && 'active'}`}>
            <AiFillSetting />
            <h1 className='nav-link_'>Settings</h1>
        </Link>}
        {getFromStorage(LocalStorageKeys.USER).user.user_type_id != 3 && <Link to="/message-status" onClick={() => handleNavToggle('http://localhost:5173/message-status')} className={`nav-item_ ${currentUrl == "http://localhost:5173/message-status" && 'active'}`}>
            <MdMessage />
            <h1 className='nav-link_'>Message Status</h1>
        </Link>}
        {getFromStorage(LocalStorageKeys.USER).user.user_type_id != 3 && <Link to="/analytics" onClick={() => handleNavToggle('http://localhost:5173/analytics')} className={`nav-item_ ${currentUrl == "http://localhost:5173/analytics" && 'active'}`}>
            <SiGoogleanalytics />
            <h1 className='nav-link_'>Dashboard</h1>
        </Link>}
    </nav>
  )
}

export default Navbar
