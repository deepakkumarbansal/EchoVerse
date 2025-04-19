import { User } from "../models/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
    }
    const user = await User.findById(decoded._id);
    if(user.token !== token){
        return res.status(401).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
})