import multer from 'multer';

export const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(
        new Error(
          'Invalid file type. Only JPEG, JPG, PNG, GIF and WEBP are allowed'
        ),
        false
      );
    }
  },
});
