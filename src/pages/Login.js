
import React from "react";
import '../App.css';

import { Link } from "react-router-dom";
function Login(){
return(
<>
{/* <NavBar/> */}
<div>
    <div>
        <form >

            <h4 className="text-2xl mb-7">Login</h4>
            <input type="text" placeholder="Email" className="input-box"/>
    <input type="password" placeholder="Enter Your password" className=""/>
<button type="submit" className="btn-primary">Login</button>

<p className="text-sm">Not registered yet?{""}
    <Link to ="/signup" classname="">Create an account</Link>
</p>
        </form>
    </div>
</div>

<div>
<div>
   

</div>
</div>

</>

);
};

export default Login;