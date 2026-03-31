import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Location } from '../models/location.js';

export const getCurrentUser = async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(user);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select('name avatarUrl articlesAmount');

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(user);
};

export const getUserPlaces = async (req, res) => {
  const { id } = req.params;

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filter = { ownerId: String(id) };

  const [places, totalPlaces] = await Promise.all([
    Location.find(filter).skip(skip).limit(limit).lean(),
    Location.countDocuments(filter),
  ]);

  res.status(200).json({
    data: places,
    pagination: {
      total: totalPlaces,
      page,
      limit,
      totalPages: Math.ceil(totalPlaces / limit),
    },
  });
};
