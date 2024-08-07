import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import ProtectedRoute from './protected/ProtectedRoute'
import Navbar from './pages/Navbar'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useAuth } from './Context/AuthContext'

function App() {

  const { setIsAuthenticated } = useAuth()

  let jwt = Cookies.get('access_token')

  if(jwt) {

    if (!jwt.split('.').length == 3) {
      return
    }else{
      setIsAuthenticated(true)  
    }
  }
  return (
    <div>

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/login' Component={Login} />
        <Route path='/' Component={Login} />
        <Route path='/register' Component={Register} />

        
        <Route path='/user' element={<ProtectedRoute />}>
          <Route path='dashboard' element={<Dashboard />} />
        </Route>

      </Routes>

    </BrowserRouter>
    
    </div>
  )
}

export default App
