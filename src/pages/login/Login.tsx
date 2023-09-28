import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [loggedIn, SetLoggedIn] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        loggedIn ? navigate("/complaints") : null
    }, [])
  return (
    <div className='login-container'>
      Login
    </div>
  )
}

export default Login
