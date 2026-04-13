import createHttpError from 'http-errors';
import multer from 'multer';

export const errorHandler = (err, req, res, next) => {
  console.error('Error Middleware:', err);

  //помилки щодо відправки файлу фото
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res
        .status(413)
        .json({ message: 'Файл завеликий. Максимальний розмір — 5 MB' });
    }

    return res.status(400).json({
      message: err.message,
    });
  }

  if (
    err.message ===
    'Invalid file type. Only JPEG, JPG, PNG, GIF and WEBP are allowed'
  ) {
    return res.status(400).json({
      message: err.message,
    });
  }

  //загальні помилки

  if (createHttpError.isHttpError(err)) {
    return res
      .status(err.statusCode || err.status || 500)
      .json({ message: err.message });
  }

  const isProd = process.env.NODE_ENV === 'production';

  res.status(err.status || 500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message || 'Internal server error',
  });
};
