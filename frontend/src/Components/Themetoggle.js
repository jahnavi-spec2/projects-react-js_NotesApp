
import React from"react";
import { Sun,Moon}from "lucide-react"

const Themetoggle=({darkMode,setDarkMode})=>{
return(
    <button 
    onClick={()=>setDarkMode(!darkMode)} 
    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
      {darkMode ? <Sun /> : <Moon />}
    </button>
)
}

export default Themetoggle;