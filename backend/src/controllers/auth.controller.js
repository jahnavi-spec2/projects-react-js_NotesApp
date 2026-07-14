import jwt from "jsonwebtoken";
import {Apierror} from "../utils/Apierror.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import crypto from "crypto";
import { sendEmail ,emailVerificationMailgenContent} from "../utils/mail.js";
const generateRefreshAccessToken= async(userId)=>{
    const user=await  User.findById(userId);

    if (!user) {
    throw new Apierror(404, "User not found");
}
const rT=user.generateRefreshToken();
const aT=user.generateAccessToken();
user.refreshToken=rT;
await user.save({validateBeforeSave:false})

return({
    accessToken:aT,
    refreshToken:rT
})
}
;

console.log("Signup controller reached");
const registerUser=asyncHandler(async(req,res)=>{

       console.log("1");
    const {email,username,password,role}=req.body;

           console.log("2");

    if(!username || ! email || ! password)
throw new Apierror(400, "Field is required");

    const existeduser= await User.findOne({$or: [{username},{email}]});
          console.log("3");

    if(existeduser)
         throw new Apierror(409,"User already exists");
    const user= await User.create({
        email,
        username,
        password,
    isemailVerified:false});
       console.log("4");

       const {unHashedToken,hashToken,tokenExpiry}= user.generateTemporaryToken();
              console.log("5");

          user.emailVerificationToken = hashToken;
          user.emailVerificationExpiry=tokenExpiry;

          await user.save({validateBeforeSave:false})
                 console.log("6");


          await sendEmail({
 email: user?.email,
 subject:"Please verify your email",
mailgenContent:emailVerificationMailgenContent(
        user.username,
                `${req.protocol}://${req.get("host")}/api/v1/usersauth/verify-email/${unHashedToken}`
          )})
                 console.log("7");

          const createdUser= await User.findById(user._id).select(
 "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"

 )
 if(!createdUser){
    throw new Apierror(500,"Internal Error...Something went wrong")
 }
return res.status(201).json(new ApiResponse(201,{user:createdUser}, "User registered successfully. Your verification email has been sent to your email")
 )   });



    const login=asyncHandler(async(req,res)=>{
        const {email,password}=req.body;

        if(!email){
             throw new Apierror(400," email is required")// we are assuming tht login can take plave either from email or password anthing
    }
        if (!password) {
             throw new Apierror(400, "Password is required");}
        const user=await User.findOne({email});
if(!user){
        throw new Apierror(409,"User does not exists");
}
if(!user.isemailVerified){
    throw new Apierror(403, "Please verify your email first");
}
const isPasswordValid=user.isPasswordCorrect(password)
if(!isPasswordValid){
    throw new Apierror(400, "Invalid Password")
}

const{accessToken: aT, refreshToken: rT}=await generateRefreshAccessToken(user._id)
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
);

    });

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
return res.status(200).clearCookie("refreshToken",options)
.clearCookie("accessToken",options)
.json(
    new ApiResponse(200, {}, "User logged out")
)
    })


    const verifyEmail=asyncHandler(async(req,res)=>{
        const {verificationToken}=req.params;
        if(!verificationToken) {
            throw new Apierror(400,"Email Verification Token is missing")
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

    user.emailVerificationToken=undefined;
    user.emailVerificationExpiry= undefined;
        user.isemailVerified= true;

    await user.save({validateBeforeSave: false }); 


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


const refreshAccessToken= asyncHandler(async(req,res)=>{
    const incomingRefreshToken=req.cookies.refreshToken || req.body.refreshToken 

if(!incomingRefreshToken)
    throw new Apierror(401,"Unauthorised access")


try{
const decodedToekn= jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

const user= await User.findById(decodedToekn?._id);

if(!user) throw new Apierror(401,"Invalid attempt");
if(incomingRefreshToken!==user?.refreshToken){// the token should be in the DB ie expired
    throw new Apirrror(401," Refresh Token is Expired");
 }

const options={
    httpOnly:true,
    secure:true
}

const { accessToken: aT, refreshToken: newrT}= await generateRefreshAccessToken(user._id)

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
})

const forgotpasswordRequest=asyncHandler(async(req,res)=>{
    const {email}=req.body
    const user=await User.findOne({email})
  if(!user){
        throw new ApiError(404,"User does not exist ",[])
    }

    const {unHashedToken,hashToken,tokenExpiry}= user.generateTemporaryToken();

    user.forgotPasswordToken=hashToken
    user.forgotPasswordExpiry=tokenExpiry
await user.save({validateBeforeSave : false})
    await sendEmail({  
            email: user?.email,
            subject:"Password reset request",
            mailgenContent:forgotPasswordMailgenContent(
                user.username,
                `${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${unHashedToken}`

            ),
        });
  return res
        .status(200)
        .json(
            new ApiResponse(200,
            
                {},
                "Password reset mail has been sent on your email "
            )
        )


})


const resetforgotPassword= asyncHandler(async(req,res)=>{
    const {resetToken}= req.params
    const {newPassword}= req.body

    let hashedToken=crypto.createHash("sha256").update(resetToken).digest("hex")

const user=await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: {$gt: Date.now()}
})
if(!user){
    throw new ApiError(489,"Token is invalid or expired");
}
user.forgotPasswordExpiry=undefined;
user.forgotPasswordToken= undefined;

user.password=newPassword;// updates the new password
await user.save({validateBeforeSave: false});

return res
.status(200)
.json(new ApiResponse(200,
    {},
    "Password reset successfully!"
))
});


export {
    registerUser, forgotpasswordRequest,resetforgotPassword,login, logoutUser, verifyEmail,refreshAccessToken
}