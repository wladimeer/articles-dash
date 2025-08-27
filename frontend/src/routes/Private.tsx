import { Navigate, Outlet } from 'react-router'
import { ROUTE_CONFIG } from '../constants/route'
import { useUserStore } from '../store/user'

const Private = () => {
  const { isUserValid } = useUserStore()

  return isUserValid() ? <Outlet /> : <Navigate replace to={ROUTE_CONFIG.LOGIN} />
}

export default Private
