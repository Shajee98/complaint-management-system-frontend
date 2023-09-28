import { Navigate, Outlet } from 'react-router-dom'

interface Props {
    user: boolean
    redirectPath: string
}

const ProtectedRoute = (props: Props) => {
    if (!props.user) {
      return <Navigate to={props.redirectPath} replace />
    }
    
    return <Outlet />
  };

export default ProtectedRoute