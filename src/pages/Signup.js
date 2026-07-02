
import React from "react";
import '../App.css';
import PasswordInput from "../Components/input/PasswordInput";
import { useState } from "react";

import { validateEmail } from "../utils/helper";
import { Link } from "react-router-dom";
const Signup = () => {  

    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [error,setError]= useState(null);
  const [username,setUsername]=useState("");

    const handleSignup= async(e)=>{
        e.preventDefault();

        if(!email) { 
         setError("Please enter the given fields");
            return;
        }
        if(!validateEmail(email)){   
            setError("Please enter a valid email address");
            return;}
            setError(null);
    }
return(
<>
{/* <NavBar/> */}
<div className="flex justify-center items-center h-screen">
    <div className="w-100 border-rounded-lg px-7 py-10 bg-white shadow-md">
       
        <form onSubmit={handleSignup}>
           
            <h4 className="text-2xl mb-7">Signup</h4>
            <input type="text" placeholder="Username" className="input-box" value={username} onChange={(e) => setUsername(e.target.value)}/>

            <input type="text" placeholder="Email" className="input-box" value={email} onChange={(e) => setEmail(e.target.value)}/>
  <PasswordInput 
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  />

   {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
<button type="submit" className="btn-primary">Signup</button>
  <div>
    <Link to="" className="text-sm text-blue-500 hover:underline">Forgot Password?</Link>
    <p className="text-sm text-center mt-4">Already have an account?{" "}
      <Link to="/login" className="font-medium text-blue-500 hover:underline">Login</Link>
    </p>
  </div>
        </form>

    </div>
</div>

</>

);
}
export default Signup;
