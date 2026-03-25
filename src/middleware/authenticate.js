import createHttpError from 'http-errors';

import { User } from '../models/user.js';
import { Session } from '../models/session.js';

export const authenticate = async (req, res, next) => {
  if (!req.cookies.accessToken)
    throw createHttpError(401, 'Unauthorized: missing access token');

  const session = await Session.findOne({
    accessToken: req.cookies.accessToken,
  });
  if (!session) throw createHttpError(401, 'Unauthorized: session not found');

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired)
    throw createHttpError(401, 'Unauthorized: access token expired');

  const user = await User.findById(session.userId);
  if (!user) throw createHttpError(401);

  req.user = user;

  next();
};
