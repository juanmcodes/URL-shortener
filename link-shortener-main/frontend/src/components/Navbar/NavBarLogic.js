import { useLocation } from 'react-router-dom'

export const useNavBar = () => {
  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard'
  return { isDashboard }
}
