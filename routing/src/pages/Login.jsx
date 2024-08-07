import axios from "axios"
import {  useEffect, useState } from "react"
import Cookies from 'js-cookie'
import { useAuth } from "../Context/AuthContext"
import { Navigate, useNavigate } from "react-router-dom"

function Login() {
  const [ user, setUser ] = useState({
    name:"",
    password:""
  })
  const navigate = useNavigate()
  
  const {setIsAuthenticated, isAuthenticated } = useAuth()
  const cookie = Cookies.get('access_token')
  

  function handleChange(e){
    const { name, value } = e.target 

    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleLogin(){

   const result = await axios.post('http://localhost:3000/login', user, { withCredentials: true })
   console.log(result.data) 

   if(result.data.message == 'authorized user' ){
    setIsAuthenticated(true)
   } 

  }

  return (
    <div>

        <input type="text" name="name" onChange={handleChange} value={user.name}/>
        <input type="text" name="password" onChange={handleChange} value={user.password}/>
        <button type="submit" onClick={handleLogin}> Login </button>
        
    </div>
  )
}

export default Login
