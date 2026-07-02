import React from 'react';

import { useState } from 'react';

const PasswordInput =({value,onChange,placeholder}) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggelPasswordVisibility = () => {
        setIsShowPassword(!isShowPassword);
    }
    return(
        <>
<div className="flex item-center  bg-transparent border-none  rounded mb-3 w-full">
<input 
type={isShowPassword ? "text" : "password"}
value={value}
onChange={onChange}
placeholder={placeholder || "Password"}
 className=" w-full p-2  border border-gray-300 rounded-md focus:outline-none  focus:ring-blue-500 focus:border-blue-500 m-2"/>
</div>

        </>
    );
};



export default PasswordInput;