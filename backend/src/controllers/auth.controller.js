import {User} from "../models/user.models.js";
import { ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/async-handler.js";
import {ApiError} from "../utils/Apierror.js";
import {sendEmail,emailVerificationMailgenContent} from "../utils/mail.js";
import { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";



const generateAccessRefreshToken= async(userId)=>{
try{
    const user =await User.findById(userId)
    const aT=user.generateAccessToken()
    const rT=user.generateRefreshToken();

    user.refreshToken= refreshToken
    await user.save({validateBeforeSave: false})


    return{aT,rT}
}
catch(error){  
throw new Apierror(500, "AccessToken error")
}
}




const registerUser= asyncHandler(async =>{
    const {username,email,password}=req.body;
    if(!username || !email || !password)
        throw new Apierror(400,"Required field!")

    const existedUser=User.findOne({
        $or: [{username},{email}]
    })
    if(existedUser){
        throw new Apierror(409,"User Already Exists")
    }

    const user=await User.create({
        email,
        password,
        username,
        isEmailVerified:false
    })

    const {unHashedToken,hashToken,tokenExpiry}=user.generateTemporaryToken();
    user.emailVerificationToken= hashToken,
    user.emailVerificationExpiry=tokenExpiry

    await user.save({validateBeforeSave:false})
    await sendEmail({
    email:user?.email,
    subject:"Please verify your email",
    mailgenContent:emailVerificationMailgenContent(
        user.username,//it sends 2 thing username and verificationurL
                `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`
    )

 });
 const createdUser= await User.findById(user._id).select(
 "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"

 )
 if(!createdUser){
    throw new Apierror(500,"Internal Error...Something went wrong")
 }
    return res
    .status(201)
    .json(
        new ApiResponse(
            201,{user:createdUser},
            "User registered successfully. Your verification email has been sent to your email"
        )
    )
})