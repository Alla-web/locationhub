import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error('Error Middleware:', err);

  if (createHttpError.isHttpError(err)) {
    return res
      .status(err.statusCode || err.status || 500)
      .json({ message: err.message });
  }

  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
};
