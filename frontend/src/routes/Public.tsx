import { Navigate, Outlet } from 'react-router'
import { ROUTE_CONFIG } from '../constants/route'
import { useUserStore } from '../store/user'

const Public = () => {
  const { isUserValid } = useUserStore()

  return !isUserValid() ? <Outlet /> : <Navigate replace to={ROUTE_CONFIG.HOME} />
}

export default Public
