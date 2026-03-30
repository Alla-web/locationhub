import { Router } from 'express';

import authRoutes from './authRoutes.js';
import locationRoutes from './locationRoutes.js';
import userRoutes from './userRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import feedbacksRoutes from './feedbacksRoutes.js';

const router = Router();

router.use(authRoutes);
router.use(locationRoutes);
router.use(userRoutes);
router.use(categoryRoutes);
router.use(feedbacksRoutes);

export default router;
