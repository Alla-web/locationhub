import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';

const authRoutes = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Реєстрація нового користувача
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "anna@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "StrongPassword123"
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Successfully registered a user!
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *             examples:
 *               example1:
 *                 summary: Example response
 *                 value:
 *                   status: 201
 *                   message: Successfully registered a user!
 *                   data:
 *                     user:
 *                       _id: "64f123abc123abc123abc203"
 *                       name: "Anna"
 *                       email: "anna@example.com"
 *                       avatarUrl: "https://ac.goit.global/fullstack/react/default-avatar.jpg"
 *                       articlesAmount: 0
 *                       createdAt: "2025-03-01T10:00:00.000Z"
 *                       updatedAt: "2025-03-01T10:00:00.000Z"
 *       400:
 *         description: Bad Request
 *       409:
 *         description: Conflict. Email in use
 *       500:
 *         description: Internal Server Error
 */
authRoutes.post('/auth/register', celebrate(registerUserSchema), registerUser);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Логін користувача
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "anna@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "StrongPassword123"
 *     responses:
 *       200:
 *         description: Успішний логін
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Successfully logged in!
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *             examples:
 *               example1:
 *                 summary: Example response
 *                 value:
 *                   status: 200
 *                   message: Successfully logged in!
 *                   data:
 *                     user:
 *                       _id: "64f123abc123abc123abc203"
 *                       name: "Anna"
 *                       email: "anna@example.com"
 *                       avatarUrl: "https://ac.goit.global/fullstack/react/default-avatar.jpg"
 *                       articlesAmount: 0
 *                       createdAt: "2025-03-01T10:00:00.000Z"
 *                       updatedAt: "2025-03-01T10:00:00.000Z"
 *       400:
 *         description: Bad Request (Validation error)
 *       401:
 *         description: Unauthorized (Invalid credentials)
 *       500:
 *         description: Internal Server Error
 */
authRoutes.post('/auth/login', celebrate(loginUserSchema), loginUser);

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Вийти з акаунту (logout)
 *     description: Видаляє сесію користувача (cookie / токен)
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Успішний logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully logged out
 *       401:
 *         description: Користувач не авторизований
 *       500:
 *         description: Внутрішня помилка сервера
 */
authRoutes.post('/auth/logout', authenticate, logoutUser);

/**
 * @openapi
 * /api/auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Оновити сесію (refresh access token)
 *     description: Оновлює access token за допомогою refresh token (з cookie)
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Сесію оновлено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Невалідний або відсутній refresh token
 *       500:
 *         description: Внутрішня помилка сервера
 */
authRoutes.post('/auth/refresh', authenticate, refreshUserSession);

/**
 * @openapi
 * /api/auth/request-reset-email:
 *   post:
 *     tags: [Auth]
 *     summary: Запит на скидання пароля
 *     description: Надсилає користувачу email з інструкціями для скидання пароля
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Лист для скидання пароля успішно надіслано
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reset password email has been successfully sent.
 *       400:
 *         description: Некоректні дані запиту
 *       404:
 *         description: Користувача з таким email не знайдено
 *       500:
 *         description: Внутрішня помилка сервера
 */
authRoutes.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail
);

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
authRoutes.post(
  '/auth/reset-password',
  celebrate(resetPasswordSchema),
  resetPassword
);

export default authRoutes;
