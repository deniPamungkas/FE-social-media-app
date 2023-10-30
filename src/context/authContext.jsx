import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [currUser, setCurrUser] = useState(localStorage.getItem('currentUser') || null)
    const [err, setErr] = useState(null)
    const login = async(inputs) =>{
        try {
          const res = await axios.post("http://localhost:8800/auth/login", inputs, {withCredentials:true});
          if(res.data.username) {
              setCurrUser(JSON.stringify(res.data))
              window.location.pathname = `/${res.data.id}`
            }
          if(res.data.error) return setErr(res.data)
        } catch (error) {
          console.log(error)
        }
        // setCurrUser(JSON.stringify({nama:"deni Pamungkas", id:9}))
    }
    const logout = async()=> {
    localStorage.removeItem('currentUser')
    window.location.pathname = '/login'
    try {
      const response = await axios.get('http://localhost:8800/auth/logout', {withCredentials:true})
      return response.data
    } catch (error) {
      console.log(error)
    }
    }
    useEffect(() => {
        localStorage.setItem('currentUser', currUser) 
    }, [currUser])
    
  return (
    <AuthContext.Provider value={{currUser, login, logout, err}}>
        {children}
    </AuthContext.Provider>
  )
}
 AuthContextProvider.propTypes ={
    children: PropTypes.any
 }

export default AuthContextProvider