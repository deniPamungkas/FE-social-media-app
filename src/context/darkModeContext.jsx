import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'

export const DarkMode = createContext();

const DarkModeContext = ({children}) => {
    const [dark, setDark] = useState(JSON.parse(localStorage.getItem('darkMode')) || false)
    const toggle = () =>{
        setDark(!dark)
    }
    useEffect(() => {
      localStorage.setItem('darkMode', dark)
    }, [dark])
    
  return (
    <DarkMode.Provider value={{dark, toggle}}>
        {children}
    </DarkMode.Provider>
  )
}
 DarkModeContext.propTypes ={
    children: PropTypes.any
 }

export default DarkModeContext