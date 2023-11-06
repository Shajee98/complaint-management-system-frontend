import { useState, useEffect } from 'react'
import { AiFillSetting } from "react-icons/ai";
import { GiNotebook} from 'react-icons/gi'
import { Link } from 'react-router-dom';
import './Navbar.scss'
import { LocalStorageKeys, getFromStorage } from '../../../utils/localStorage';


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
            <h1 className='nav-link_'>Complaints</h1>
        </Link>
        {getFromStorage(LocalStorageKeys.USER).user.user_type_id != 3 && <Link to="/settings" onClick={() => handleNavToggle('http://localhost:5173/settings')} className={`nav-item_ ${currentUrl == "http://localhost:5173/settings" && 'active'}`}>
            <AiFillSetting />
            <h1 className='nav-link_'>Settings</h1>
        </Link>}
    </nav>
  )
}

export default Navbar
