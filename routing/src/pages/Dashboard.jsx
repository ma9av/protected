import axios from "axios"
import { useEffect, useState } from "react"
import Cookies from 'js-cookie'
function Dashboard() {  
  const [ details, setDetails ] = useState()
  useEffect(()=>{

    async function fetchDetails() {

      const output = await axios.get('http://localhost:3000/userdata',{
        headers: { 
          'Content-Type': 'application/json',
          'authorization': `Bearer ${Cookies.get('access_token')}`
        }
      })
      setDetails(output.data)
    }

    fetchDetails()

  },[])

  return (
    <div>
      {
        details && 
        <div>
          <h1>Name : {details.name}</h1>
          <h1>ID : {details.user_id}</h1>
        </div>
      }
    </div>
  )
}

export default Dashboard
