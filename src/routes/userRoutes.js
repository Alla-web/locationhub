import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getCurrentUser,
  getUserById,
  getUserPlaces,
} from '../controllers/userController.js';

const userRoutes = Router();

userRoutes.get('/users/me', authenticate, getCurrentUser);
userRoutes.get('/users/:id', getUserById);
userRoutes.get('/users/:id/places', getUserPlaces);

export default userRoutes;
