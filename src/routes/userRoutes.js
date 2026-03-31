import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getCurrentUser,
  getUserById,
  getUserPlaces,
} from '../controllers/userController.js';

const userRoutes = Router();

/**
 * @openapi
 * /api/auth/reset-password:
 *   post:
 *     tags: [Auth]
 *     summary: Скидання пароля
 *     description: Встановлює новий пароль за допомогою токена, отриманого з email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - token
 *             properties:
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: "newStrongPassword123"
 *               token:
 *                 type: string
 *                 description: Токен для скидання пароля (з email)
 *                 example: "reset-token-abc123"
 *     responses:
 *       200:
 *         description: Пароль успішно змінено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password has been successfully reset.
 *       400:
 *         description: Некоректні дані (наприклад, короткий пароль)
 *       401:
 *         description: Невалідний або прострочений токен
 *       404:
 *         description: Користувача не знайдено
 *       500:
 *         description: Внутрішня помилка сервера
 */
userRoutes.get('/users/me', authenticate, getCurrentUser);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Отримати користувача за ID
 *     description: Повертає інформацію про користувача за його ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID користувача
 *         schema:
 *           type: string
 *           example: "65a1b2c3d4e5f6789012345"
 *     responses:
 *       200:
 *         description: Дані користувача
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "65a1b2c3d4e5f6789012345"
 *                 name:
 *                   type: string
 *                   example: "Іван"
 *                 email:
 *                   type: string
 *                   example: "ivan@example.com"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-01T10:00:00.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-01T10:00:00.000Z"
 *       400:
 *         description: Невалідний ID
 *       404:
 *         description: Користувача не знайдено
 *       500:
 *         description: Внутрішня помилка сервера
 */
userRoutes.get('/users/:id', getUserById);

/**
 * @openapi
 * /api/users/{id}/places:
 *   get:
 *     tags: [Users]
 *     summary: Отримати всі місця користувача
 *     description: Повертає список локацій (places), створених або доданих користувачем
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID користувача
 *         schema:
 *           type: string
 *           example: "65a1b2c3d4e5f6789012345"
 *     responses:
 *       200:
 *         description: Список локацій користувача
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "65b2c3d4e5f6789012345678"
 *                   title:
 *                     type: string
 *                     example: "Coffee Place"
 *                   address:
 *                     type: string
 *                     example: "Київ, вул. Хрещатик, 1"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-03-01T10:00:00.000Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-03-01T10:00:00.000Z"
 *       400:
 *         description: Невалідний ID користувача
 *       404:
 *         description: Користувача або локації не знайдено
 *       500:
 *         description: Внутрішня помилка сервера
 */
userRoutes.get('/users/:id/places', getUserPlaces);

export default userRoutes;
