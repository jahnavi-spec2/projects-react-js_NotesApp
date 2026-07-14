import {body} from "express-validator";


const userRegValidators=()=>{
    return[
        body("email")
              .trim()
              .notEmpty()
              .withMessage("Email is required field")
              .isEmail()
              .withMessage("Invalid Email") , 
    body("username") 
                .trim()
                .notEmpty()
                .withMessage("Username is required field")
                .isLength({min:3})
                .withMessage("Username must be atleast 3 characters long"),
    body("password")
              .trim()
              .notEmpty()
              .withMessage("Password is required field")
]
}

const loginValidator=()=>{
    return[
      body("email")

              .trim()
              .notEmpty()
              .withMessage("Email is required field")
              .isEmail()
              .withMessage("Invalid Email") , 
      body("password")
               .trim()
               .notEmpty()
               .withMessage("Password is required")
        
              


    ]
}
const userForgotPasswordValidator=()=>{
return[

   body("email")
   .notEmpty()
   .withMessage("email is required")
   .isEmail()
  . withMessage("Email is invalid")



]
}

const userResetForgotPasswordValidator=()=>{
    return [  body("newPassword")
    .notEmpty()
    .withMessage("Password is required")];
};
export {userRegValidators,loginValidator,userResetForgotPasswordValidator,userForgotPasswordValidator};