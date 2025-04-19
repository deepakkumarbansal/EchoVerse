import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/temp")
    },
    filename: (req, file, cb)=>{
        const fileName = `audio_${Date.now()}_${file.originalname}`;
        cb(null, fileName);
    }
});

export const upload = multer({storage});