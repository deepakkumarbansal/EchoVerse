import { User } from "../models/User.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {validationResult} from "express-validator";

export const registerUser = asyncHandler(async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(400, "Validation Error", errors.array());
    }
    const { fullName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    console.log("Checking for existing user", existingUser);
    
    if (existingUser) {
        throw new ApiError(400, "User already exists");
    }
    
    try {
        const newUser = new User({ fullName, email, password });
        const token = await newUser.generateToken();
        newUser.token = token;
        await newUser.save();
        newUser.password = undefined;
        res.cookie("token", token);
        res.status(201).json(new ApiResponse(201, "User registered successfully", {user: newUser, token}));
    } catch (error) {
        throw new ApiError(500, "Error wile creating user", error);
    }
});

export const loginUser = asyncHandler(async (req, res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = user.generateToken();
    user.token = token;
    await user.save();
    user.password = undefined;
    res.status(200).cookie("token", token).json(new ApiResponse(200, "User logged in successfully", {user, token}));
});

export const getUserProfile = asyncHandler(async (req, res)=>{
    const user = req.user;
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(new ApiResponse(200, "User profile fetched successfully", user));
});

export const logoutUser = asyncHandler(async (req, res)=>{
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiResponse(404, "User not found");
    }
    user.token = null;
    await user.save();
    res.clearCookie("token");
    res.status(200).json(new ApiResponse(200, "User logged out successfully"));
})