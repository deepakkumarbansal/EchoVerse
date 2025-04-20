import {validationResult} from "express-validator";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cloudinaryUpload } from "../utils/cloudinary.service.js";
import { Audio } from "../models/Audio.model.js";
import { ApiError } from "../utils/apiError.js";
import simpleCryptoJs from 'simple-crypto-js';
const SimpleCrypto = simpleCryptoJs.default;


export const createAudio = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new ApiError(400, "Validation Error", errors.array());
    }
    const { title, mood, unlockDate, unlocksAt } = req.body;
    const unlocksAtInMs = new Date(unlocksAt).toISOString()
    if(unlocksAtInMs < Date.now()) {
        throw new ApiError(405, "Unlocks at date should be greater than current date");
    }
    const userId = req.user._id;
    const localAudioFilePath = req.file?.path;
    if (!localAudioFilePath) {
        throw new ApiError(406, "Audio file is required");
    }    
    const audioResponse = await cloudinaryUpload(localAudioFilePath);

    const newAudio = await Audio.create({
        title, 
        mood,
        unlockDate,
        file: audioResponse.url, //encrypting before saving to DB
        userId,
        unlocksAt
    })

    res.status(201).json(new ApiResponse(201, "Audio created successfully", newAudio));
})

export const getDecryptedAudio = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new ApiError(401, "Validation Error", errors.array());
    }
    const userId = req.user._id;
    const { audioId } = req.params;
    const audio = await Audio.findById(audioId);
    if (!audio) {
        throw new ApiError(404, "Audio not found");
    }
    
    if(audio.userId.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to access this audio");
    }
    const unlocksAtInMs = new Date(audio.unlocksAt).toISOString();

    if (unlocksAtInMs > Date.now()) {
        throw new ApiError(403, "Audio is not unlocked yet");
    }

    const simpleCrypto = new SimpleCrypto(process.env.SIMPLE_CRYPTO_SECRET);
    const decryptedFile = await simpleCrypto.decrypt(audio.file);
    audio.file = decryptedFile;
    res.status(200).json(new ApiResponse(200, "Audio fetched successfully", { audio }));
});

export const getAllAudio = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new ApiError(401, "Validation Error", errors.array());
    }
    const userId = req.user._id;
    const audios = await Audio.find({ userId }).sort({ createdAt: -1 });
    if (!audios || audios.length === 0) {
        throw new ApiError(404, "No audio found");
    }
    res.status(200).json(new ApiResponse(200, "All audio fetched successfully", audios));
})

export const deleteAudio = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new ApiError(401, "Validation Error", errors.array());
    }
    const userId = req.user._id;
    const { audioId } = req.params;
    const audio = await Audio.findById(audioId);
    if (!audio) {
        throw new ApiError(404, "Audio not found");
    }
    if(audio.userId.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to delete this audio");
    }
    await Audio.findByIdAndDelete(audioId);
    res.status(200).json(new ApiResponse(200, "Audio deleted successfully"));
})