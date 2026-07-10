import {User} from "../models/user.models.js";
import { ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {Apierror} from "../utils/Apierror.js";
import {sendEmail,emailVerificationMailgenContent} from "../utils/mail.js";
// import { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";



const generateAccessRefreshToken= async(userId)=>{
try{
    const user =await User.findById(userId)
    const aT=user.generateAccessToken()
    const rT=user.generateRefreshToken();

    user.refreshToken= rT
    await user.save({validateBeforeSave: false})


    return{aT,rT}
}
catch(error){  
throw new Apierror(500, "AccessToken error")
}
}




const registerUser= asyncHandler(async (req,res) =>{
    const {username,email,password}=req.body;
    if(!username || !email || !password)
        throw new Apierror(400,"Required field!")

    const existedUser=await User.findOne({
        $or: [{username},{email}]
    })
    if(existedUser){
        throw new Apierror(409,"User Already Exists")
    }

    const user=await User.create({
        email,
        password,
        username,
        isemailVerified:false
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


// function login(req,res){
//     res.json({
//         message:"LoggedIn successfuully"
//     })
// }

// async function register(req,res){
//     const{username,password,email,role}= req.body;
//     const hashPassword=await bcyrpt.hash(password,10);

//     const user= await User.Create({username:username,email:email,role:role});
//     if(user){
        
//     }
// res
// .status(200)
// .json({
//     message:"created Account",
//     hashPassword
// })

const login= asyncHandler(async (req,res)=>{
const {email,password}=req.body;
if(!email || !password)
    throw new Apierror(400,"Field is Required")
const user= await User.findOne({email})

if(!user)
    throw new Apierror(400,"User does not exist")

const isPasswordValid=await user.isPasswordCorrect(password);

if(!isPasswordValid){
    throw new Apierror(400,"Invalid credentials");
}

const {aT,rT}=await generateAccessRefreshToken(user._id)

const loggedInUser= await User.findById(user._id).select(
                "-password -refreshToken -emailVerificationToken -emailVerificationExpiry")


                const options={
                     httpOnly: true,
                     secure:true
}

return  res.status(200)
.cookie("accessToken", aT,options)
.cookie("refreshToken",rT,options)
.json(new ApiResponse(200,{user:loggedInUser,aT,rT},"User logged in sucessfully")
)
})


const logoutUser= asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,{
            $set:{
                refreshToken: "",
            }
        },{
            new:true,
        })

        const options={
            httpOnly:true,
            secure:true
        }

        return res// we send response where only cookies needs to be removed
         .status(200)
         .clearCookie("accessToken",options)
         .clearCookie("refreshToken",options)
  .json(
    new ApiResponse(200, {}, "User logged out")
)
})

const verifyEmail= asyncHandler(async (req,res)=>{
    const {verificationToken}=req.params

    if(!verificationToken){
        throw new Apierror(400,"Email verification token is missing")
    }

    let hashedToken= crypto.createHash("sha256")
    .update(verificationToken)
    .digest("hex")

    const user= await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpiry:{$gt:Date.now()}
    })

    if(!user){
        throw new Apierror(400,"Token Expired or Invalid ")
    }

    user.isemailVerified= true;
    user.emailVerificationToken=undefined;
    user.emailVerificationExpiry= undefined;
    await user.save(); 


    return res
.status(200)
.json(
    new ApiResponse(
200,{
    isemailVerified:true, 
}, "Email is verified "
    )
)
})



async function refreshaccessToken(req,res){
const incomingRefreshToken=req.cookies.refreshToken || req.body.refreshToken 

if(!incomingRefreshToken)
    throw new Apierror(401,"Unauthorised access")


try{
const decodedToekn= jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

const user= await User.findById(decodedToekn?._id);

if(!user) throw new Apierror(401,"Invalid attempt");


const options={
    httpOnly:true,
    secure:true
}

const {aT,rT:newrT}= await generateAccessRefreshToken(user._id)

user.refreshToken= newrT;
await user.save()


res.status(200)
.cookie("accessToken",aT,options)
.cookie("refreshToken",newrT,options)
.json(new ApiResponse(200,
    {aT, refreshToken:newrT},
    "Access token refreshed"
))
}
catch(error){
 throw new Apierror(401,"Invalid refreshToken")
}
}

// async function forgotpasswordRequest(req,res){
// const {email}=req.body
// const user= await User.findOne({email})

// if(!user) throw new Apierror(404,"User does not exist" ,[])
// }


// const {unHashedToken,hashToken,tokenExpiry}
// = user.generateTemporaryToken();


// user.forgotPasswordToken=hashToken,
// user.forgotPasswordExpiry=tokenExpiry


// await user.save({validateBeforeSave: false})

//  await sendEmail({
//     email: user?.email,
//             subject:"Password reset request",
//             mailgenContent:forgotPasswordMailgenContent(
//                 user.username,
//                 `${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${unHashedToken}`

//             ),
//  })

//  res.status(200).json(new ApiResponse(200,{},"Password-reset mail has been sent on your email"))





// const resetForgotPassword= asyncHandler(async(req,res)=>{
// const {resetToken}= req.params
// const {newPassword}= req.body

// let hashToken= crypto.createHash("sha256").update(resetToken).digest("hex")

// const user= await User.findOne({
// forgotPasswordToken:hashToken,
// forgotPassowrdExpiry:{$gt:Date.now()}
// })

// if(!user) 
//      throw new Apierror(489, "Token is Invalid Or Expired")

// user.forgotPasswordExpiry= undefined;
// user.forgotPasswordToken=undefined;

// user.password= newPassword;
// await user.save({validateBeforeSave: false})

// return res.status(200).json(new ApiResponse(200,{},"Password reset sucessfully!!"))
// })
export {
    registerUser, login, logoutUser, verifyEmail,refreshaccessToken
}
