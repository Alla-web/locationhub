import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';
import createHttpError from 'http-errors';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export const saveFileToCloudinary = async file => {
  try {
    const response = await cloudinary.uploader.upload(file.path, {
      folder: 'relax-map-avatars',
    });

    await fs.unlink(file.path);

    return response.secure_url;
  } catch {
    await fs.unlink(file.path);
    throw createHttpError(500, 'Failed to upload file to Cloudinary');
  }
};
