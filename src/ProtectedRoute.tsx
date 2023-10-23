import { Navigate, Outlet } from 'react-router-dom'
import { LocalStorageKeys, getFromStorage } from '../utils/localStorage';

interface Props {
    redirectPath: string
}

const ProtectedRoute = ({redirectPath}: Props) => {
  
    if (!getFromStorage(LocalStorageKeys.USER)) {
      return <Navigate to={redirectPath} replace />
    }
    
    return <Outlet />
  };

export default ProtectedRoute