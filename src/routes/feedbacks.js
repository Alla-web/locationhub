import express from 'express';
import {
  getFeedbacks,
  createFeedback,
} from '../controllers/feedbacksController.js';

const router = express.Router();

router.get('/', getFeedbacks);
router.post('/', createFeedback);

export default router;
