import { useState, useEffect } from 'react'
import { AiFillSetting } from "react-icons/ai";
import { GiNotebook} from 'react-icons/gi'
import { Link } from 'react-router-dom';
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
    <nav className="navbar">
        <Link to="/complaints" onClick={() => handleNavToggle('http://localhost:5173/complaints')} className={`nav-item ${currentUrl == "http://localhost:5173/complaints" && 'active'}`}>
            <GiNotebook />
            <h1 className='nav-link'>Complaints</h1>
        </Link>
        <Link to="/settings" onClick={() => handleNavToggle('http://localhost:5173/settings')} className={`nav-item ${currentUrl == "http://localhost:5173/settings" && 'active'}`}>
            <AiFillSetting />
            <h1 className='nav-link'>Settings</h1>
        </Link>
    </nav>
  )
}

export default Navbar
