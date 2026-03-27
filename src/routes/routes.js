import { Router } from 'express';

import authRoutes from './userRoutes.js';
import locationRoutes from './locationRoutes.js';
import userRoutes from './userRoutes.js';
import Feedback from '../models/feedback.js';

const router = Router();

router.use(authRoutes);
router.use(locationRoutes);
router.use(userRoutes);
router.use(Feedback);

export default router;
