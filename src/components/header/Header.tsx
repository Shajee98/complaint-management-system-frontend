import { BsFillPersonFill } from 'react-icons/bs'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import './Header.scss'
import { useState } from 'react'

const Header = () => {
    const [visible, setVisible] = useState(false)
  return (
    <div className='header-container shadow'>
      <img className='logo' src="../../../assets/AEG-pakistan.png" alt="logo" />
      <div className='profile-avatar' onClick={() => setVisible(!visible)}>
        <BsFillPersonFill />
        {visible ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        {visible && <button className='logout-button'>Logout</button>}
      </div>
    </div>
  )
}

export default Header
