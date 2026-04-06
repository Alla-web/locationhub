import { Router } from 'express';
import {
  getFeedbacks,
  createFeedback,
} from '../controllers/feedbacksController.js';
import { celebrate } from 'celebrate';
import {
  createFeedbacksSchema,
  getFeedbacksSchema,
} from '../validations/feedbackValidation.js';

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
 *           example: 69c6be86a6613043f807c2e1
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
 *
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
 *               - text
 *               - rate
 *             properties:
 *               locationId:
 *                 type: string
 *                 example: "69c6be86a6613043f807c2e1"
 *               text:
 *                 type: string
 *                 minLength: 1
 *                 example: "Дуже гарне місце!"
 *               rate:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *     responses:
 *       201:
 *         description: Створено
 *       401:
 *         description: Не авторизовано
 */
router.get('/feedbacks', celebrate(getFeedbacksSchema), getFeedbacks);

/**
 * @openapi
 * /api/feedbacks:
 *   post:
 *     tags:
 *       - Feedbacks
 *     summary: Створити новий відгук
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
 *               - text
 *               - rate
 *             properties:
 *               locationId:
 *                 type: string
 *                 pattern: '^[a-fA-F0-9]{24}$'
 *                 example: "64f1a2b3c4d5e6f789012345"
 *               text:
 *                 type: string
 *                 minLength: 1
 *                 example: "Дуже гарне місце!"
 *               rate:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *     responses:
 *       201:
 *         description: Відгук успішно створено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64f123abc123abc123abc204"
 *                 text:
 *                   type: string
 *                   example: "Дуже гарне місце!"
 *                 rate:
 *                   type: number
 *                   example: 5
 *                 ownerId:
 *                   type: object
 *                   description: Запопульований об'єкт користувача
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64f123abc123abc123abc203"
 *                 locationId:
 *                   type: object
 *                   description: Запопульований об'єкт локації
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64f1a2b3c4d5e6f789012345"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-01T10:00:00.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-01T10:00:00.000Z"
 *                 _version:
 *                   type: number
 *                   example: 0
 *             examples:
 *               example1:
 *                 summary: Приклад відповіді
 *                 value:
 *                   _id: "64f123abc123abc123abc204"
 *                   text: "Дуже гарне місце!"
 *                   rate: 5
 *                   ownerId:
 *                     _id: "64f123abc123abc123abc203"
 *                   locationId:
 *                     _id: "64f1a2b3c4d5e6f789012345"
 *                   createdAt: "2025-03-01T10:00:00.000Z"
 *                   updatedAt: "2025-03-01T10:00:00.000Z"
 *                   _version: 0
 *       400:
 *         description: Некоректні дані запиту
 *       401:
 *         description: Користувач не авторизований
 *       500:
 *         description: Внутрішня помилка сервера
 */
router.post('/feedbacks', celebrate(createFeedbacksSchema), createFeedback);

export default router;
