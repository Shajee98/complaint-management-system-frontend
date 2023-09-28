import { useState } from 'react'
import { AiFillSetting } from "react-icons/ai";
import { GiNotebook} from 'react-icons/gi'
import { BsFillBuildingFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import './Navbar.scss'


const Navbar = () => {
    const [activeTab, setActiveTab] = useState(1)
    const handleNavToggle = (tab: number) => {
        setActiveTab(tab)
    }
  return (
    <nav className="navbar">
        <Link to="/complaints" onClick={() => handleNavToggle(1)} className={`nav-item ${activeTab == 1 && 'active'}`}>
            <GiNotebook />
            <h1 className='nav-link'>Complaints</h1>
        </Link>
        <Link to="/departments" onClick={() => handleNavToggle(2)} className={`nav-item ${activeTab == 2 && 'active'}`}>
            <BsFillBuildingFill />
            <h1 className='nav-link'>Department</h1>
        </Link>
        <Link to="/settings" onClick={() => handleNavToggle(3)} className={`nav-item ${activeTab == 3 && 'active'}`}>
            <AiFillSetting />
            <h1 className='nav-link'>Settings</h1>
        </Link>
    </nav>
  )
}

export default Navbar
