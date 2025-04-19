import { Router } from "express";
import { createAudio, getDecryptedAudio, getAllAudio, deleteAudio } from "../controllers/audio.contoller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/create-audio').post(verifyJWT, upload.single('audioBlob'), createAudio);
router.route('/get-audio/:audioId').get(verifyJWT, getDecryptedAudio);
router.route('/get-all-audio').get(verifyJWT, getAllAudio);
router.route('/delete-audio/:audioId').delete(verifyJWT, deleteAudio);

export default router;