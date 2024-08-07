import { useState, createContext, useContext } from 'react' 

export const Authcontext = createContext()

export const AuthProvider = ({ children })=>{
    const [ isAuthenticated, setIsAuthenticated] = useState(false)

    return(
        <Authcontext.Provider value={{ isAuthenticated:isAuthenticated, setIsAuthenticated:setIsAuthenticated }}>
            { children }
        </Authcontext.Provider>
    )
}

export const useAuth = ()=>{
    return useContext(Authcontext)
}