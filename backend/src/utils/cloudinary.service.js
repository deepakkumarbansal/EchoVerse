import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const cloudinaryUpload = async (localFilePath) => {
    try {
        const result = await cloudinary.uploader.upload(localFilePath, {
            folder: process.env.CLOUDINARY_FOLDER,
            resource_type: 'auto',
        });
        return result;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return null
    }
    finally {
        fs.unlinkSync(localFilePath);
    }
}