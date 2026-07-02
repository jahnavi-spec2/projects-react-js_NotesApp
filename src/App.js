
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import Landing from "./pages/Landing.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import { useState,useEffect } from "react";
function App() {

  const [darkMode,setDarkMode]=useState(localStorage.getItem("theme") === "dark");

  useEffect(()=>{
    if(darkMode){
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme","dark");
    }
    else{
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme","light");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/"   element={<Landing darkMode={darkMode} setDarkMode = {setDarkMode}/>} />

        <Route path="/login" element={<Login darkMode={darkMode} setDarkMode = {setDarkMode} />} />

        <Route path="/signup" element={<Signup darkMode={darkMode} setarkMode = {setDarkMode} />} />

        <Route path="/dashboard" element={<Dashboard darkMode={darkMode} setarkMode = {setDarkMode} />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;