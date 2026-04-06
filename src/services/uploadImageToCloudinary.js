import cloudinary from '../utils/cloudinary.js';

export const uploadImageToCloudinary = (
  fileBuffer,
  folder = 'locationhub/locations'
) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};
