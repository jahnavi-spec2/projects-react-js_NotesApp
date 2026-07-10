import {Router} from "express"

import { registerUser, login, logoutUser, verifyEmail, refreshAccessToken} from "../controllers/user.controller.js";
import {verifyJwt} from "../middlewares/auth.middleware.js";

const router=Router();
router.post("/register",registerUser);
router.post("login",login)
router.get("/verify-email/:verificationToken",verifyEmail);
router.route("/refresh-token").post(refreshaccessToken);


router.post("/logout",verifyJwt,logoutUser);


export default router;