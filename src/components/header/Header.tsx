import { useState } from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { FiLogOut } from 'react-icons/fi'
import { userLogout } from './services/Header'
import { useNavigate } from 'react-router-dom'
import './Header.scss'
import { LocalStorageKeys, removeFromStorage } from '../../../utils/localStorage'

const Header = () => {
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()
    const logout = () => {
      userLogout()
      removeFromStorage(LocalStorageKeys.USER)
      navigate('/login')
    }
  return (
    <div className='header-container shadow'>
      <div className='logo-container'>
        <img className='logo' src="../../../assets/AEG-pakistan.png" alt="logo" />
      </div>
      <div className='profile-avatar' onClick={() => setVisible(!visible)}>
        <BsFillPersonFill />
        {/* {visible ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />} */}
        <FiLogOut className='logout-button' onClick={logout}/>
      </div>
    </div>
  )
}

export default Header
