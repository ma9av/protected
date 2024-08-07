import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import Cookies from 'js-cookie'
function Navbar() {
  const { setIsAuthenticated } = useAuth()
  return (
    <div>
        <Link to="/login"> Login </Link>
        <Link to="/register"> Register </Link>
        <Link to="/user/dashboard"> Dashboard </Link>
        <button onClick={()=>{
            Cookies.remove('access_token')
            setIsAuthenticated(false)
        }}> Logout </button>
    </div>
  )
}

export default Navbar
