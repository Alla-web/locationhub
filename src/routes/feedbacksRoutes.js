import { Router } from 'express';
import {
  getFeedbacks,
  createFeedback,
} from '../controllers/feedbacksController.js';
import { celebrate } from 'celebrate';
import { createFeedbacksSchema, getFeedbacksSchema } from '../validations/feedbackValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

/**
 * @openapi
 * /api/feedbacks:
 *   get:
 *     tags: [Feedbacks]
 *     summary: Публічний список відгуків для локації
 *     parameters:
 *       - in: query
 *         name: locationId
 *         required: true
 *         schema:
 *           type: string
 *           example: 65a1b2c3d4e5f6789012345
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *     responses:
 *       200:
 *         description: OK
 *   post:
 *     tags: [Feedbacks]
 *     summary: Створити відгук (потрібна авторизація)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - locationId
 *               - userName
 *               - rate
 *               - description
 *             properties:
 *               locationId:
 *                 type: string
 *               userName:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 32
 *               rate:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               description:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 200
 *     responses:
 *       201:
 *         description: Створено
 *       401:
 *         description: Не авторизовано
 */

router.get('/', celebrate(getFeedbacksSchema), getFeedbacks);


router.post('/', authenticate, celebrate(createFeedbacksSchema), createFeedback);

export default router;
