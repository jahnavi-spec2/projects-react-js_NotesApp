import {User} from "../models/user.models.js";
import {Apierror} from "../utils/apierror.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import { emailVerificationMailgenContent } from "../utils/mail.js";
import jwt from "jsonwebtoken";
import { Apierror } from "../utils/apierror.js";
export const verifyJWT= asyncHandler(async (req,res,next)=>{
    const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer" ,"")

if(!token) throw new ApiError(401,"Unauthorised request")

    try{
  const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
   const user=await User.findById(decodedToken?._id).select(// fornd the decoded token based on id but ya dont want this
       "  -password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    ); 
if(!user){
        throw new Apierror(401," Invalid access token")
    }
    req.user=user;
    next();

}
catch{
throw new ApiError(401,"Invalid access token")

}





})