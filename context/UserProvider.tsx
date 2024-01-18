import { useState, ReactNode, useEffect, createContext } from 'react'
import { LocalStorageKeys, addToStorage, getFromStorage } from '../utils/localStorage'
// import { UserProvider } from './UserContext'
import jwtDecode, {JwtPayload} from 'jwt-decode'
import {} from 'react-router-dom'
import { context } from '../utils/types'

export const Context = createContext<context>({
  isLoading: false,
  setIsLoading: () => {

  },
  user: {},
  updateUser: function (updatedUser: any): void {
    throw new Error('Function not implemented.')
  },
  isAuthenticated: function (): boolean {
    throw new Error('Function not implemented.')
  }
})
export const ContextConsumer = Context.Consumer
export const UserProvider = Context.Provider


const UserContainer = (props: {children: ReactNode}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<{}>({})
  // const navigate = useNavigate()

  useEffect(() => {
    const userDetails = getFromStorage(LocalStorageKeys.USER)
    if (userDetails) {
      setUser(userDetails)
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isAuthenticated()) {
      // navigate('/login')
    }
    // eslint-disable-next-line
  }, [user])

  const updateUser = (updatedUser: any) => {
    console.log("updatedUser => ", updatedUser)
    if (updatedUser) {
      const newData = { ...user, ...updatedUser }
      addToStorage(LocalStorageKeys.USER, newData)
      setUser(newData)
    }
  }

  const isAuthenticated = () => {
    const user = getFromStorage(LocalStorageKeys.USER)
    const token = user ? user.jwtToken : ''
    if (token) {
      const jwt = jwtDecode<JwtPayload>(token)
      return !(Date.now() >= Number(jwt.exp) * 1000)
    }
    return false
  }
  return (
    <UserProvider
    value={{
      isLoading,
      setIsLoading,
      user,
      updateUser,
      // logout,
      isAuthenticated,
      // removeUser,
    }}
  >
    {props.children}
  </UserProvider>
  )
}

export default UserContainer
