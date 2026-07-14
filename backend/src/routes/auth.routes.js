import {Router} from "express"
import {userRegValidators,loginValidator,userForgotPasswordValidator,userResetForgotPasswordValidator} from "../validators/index.js"
import { forgotpasswordRequest,resetforgotPassword,registerUser, login, logoutUser, verifyEmail, refreshAccessToken} from "../controllers/auth.controller.js";
import {verifyJWT} from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validator.middleware.js";
const router=Router();
router.post("/register",userRegValidators(), validate,registerUser);
router.post("/login",loginValidator(),validate,login)
router.get("/verify-email/:verificationToken",verifyEmail);
router.route("/refresh-token").post(refreshAccessToken);

router.post("/logout",verifyJWT,logoutUser);
router.post("/forgot-password",userForgotPasswordValidator(),validate,forgotpasswordRequest)
router.route("/reset-password/:resetToken").post(userResetForgotPasswordValidator(), validate,resetforgotPassword)

export default router; 