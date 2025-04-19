import { Router } from "express";
import { registerUser, loginUser, getUserProfile, logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/profile').get(verifyJWT, getUserProfile);
router.route('/logout').post(verifyJWT, logoutUser);

export default router;