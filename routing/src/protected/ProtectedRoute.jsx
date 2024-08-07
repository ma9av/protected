import { Outlet, Navigate } from "react-router-dom"
import { useContext } from "react"
import { Authcontext } from "../Context/AuthContext"

function ProtectedRoute() {
    const { isAuthenticated, setisAuthenticated } = useContext(Authcontext)
    console.log(isAuthenticated)
    return(
        isAuthenticated ? <Outlet /> : <Navigate to="/login"/>
    )
}

export default ProtectedRoute
