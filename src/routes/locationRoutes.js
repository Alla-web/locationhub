import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  createLocationSchema,
  getAllLocationsSchema,
  getlocationByIdSchema,
  updateLocationSchema,
} from '../validations/locationValidation.js';
import {
  createLocation,
  getAllLocations,
  getLocatoinById,
  updateLocation,
} from '../controllers/locationController.js';

const locationRoutes = Router();

/**
 * @openapi
 * /locations:
 *   get:
 *     tags:
 *       - Locations
 *     summary: Отримати всі локації
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 perPage:
 *                   type: integer
 *                   example: 9
 *                 totalPages:
 *                   type: integer
 *                   example: 3
 *                 totalLocations:
 *                   type: integer
 *                   example: 20
 *                 locations:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Location'
 *             examples:
 *               example1:
 *                 summary: Example response
 *                 value:
 *                   page: 1
 *                   perPage: 9
 *                   totalPages: 3
 *                   totalLocations: 20
 *                   locations:
 *                     - _id: "64f123abc123abc123abc123"
 *                       image: "https://example.com/location.jpeg"
 *                       name: "Харків"
 *                       locationType:
 *                         _id: "64f123abc123abc123abc201"
 *                         name: "Історичне місце"
 *                         createdAt: "2025-03-01T10:00:00.000Z"
 *                         updatedAt: "2025-03-01T10:00:00.000Z"
 *                       region:
 *                         _id: "64f123abc123abc123abc202"
 *                         name: "Харківська область"
 *                         createdAt: "2025-03-01T10:00:00.000Z"
 *                         updatedAt: "2025-03-01T10:00:00.000Z"
 *                       rate: 5
 *                       description: "Вічний вогонь - пам'ятник воїнам, загиблим під час Другої світової війни"
 *                       owner:
 *                         _id: "64f123abc123abc123abc203"
 *                         name: "Anna"
 *                         email: "anna@example.com"
 *                         avatar: "https://avatar-123.jpeg"
 *                         createdAt: "2025-03-01T10:00:00.000Z"
 *                         updatedAt: "2025-03-01T10:00:00.000Z"
 *                       feedbacks:
 *                         - _id: "64f123abc123abc123abc204"
 *                           text: "Дуже цікаве місце"
 *                           rating: 5
 *                           owner: "64f123abc123abc123abc205"
 *                           createdAt: "2025-03-01T10:00:00.000Z"
 *                           updatedAt: "2025-03-01T10:00:00.000Z"
 *                       createdAt: "2025-03-01T10:00:00.000Z"
 *                       updatedAt: "2025-03-01T10:00:00.000Z"
 *                       _version: 0
 */
locationRoutes.get(
  '/locations',
  celebrate(getAllLocationsSchema),
  getAllLocations
);

/**
 * @openapi
 * /locations/{locationId}:
 *    get:
 *     tags:
 *      - Locations
 *     summary: Отримати локацію за її id
 *     parameters:
 *      - in: path
 *        name: locationId
 *        required: true
 *        schema:
 *          type: string
 *          example: "64f123abc123abc123abc123"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Location'
 *            examples:
 *               example1:
 *                 summary: Example response
 *                 value:
 *                   _id: "64f123abc123abc123abc123"
 *                   image: "https://ghffgkb;ldfkgbnlvb,nvkn;cvbn;vbn.jpeg"
 *                   name: "Харків"
 *                   locationType:
 *                      _id: "64f123abc123abc123abc201"
 *                      name: "Історичне місце"
 *                      createdAt: "2025-03-01T10:00:00.000Z"
 *                      updatedAt: "2025-03-01T10:00:00.000Z"
 *                   region:
 *                      _id: "64f123abc123abc123abc202"
 *                      name: "Харківська область"
 *                      createdAt: "2025-03-01T10:00:00.000Z"
 *                      updatedAt: "2025-03-01T10:00:00.000Z"
 *                   rate: 5
 *                   description: "Вічний вогонь - пам'ятник воїнам, загиблим під час Другої світової війни"
 *                   owner:
 *                      _id: "64f123abc123abc123abc203"
 *                      name: "Anna"
 *                      email: "anna@example.com"
 *                      avatar: "https://avatar-123.jpeg"
 *                      createdAt: "2025-03-01T10:00:00.000Z"
 *                      updatedAt: "2025-03-01T10:00:00.000Z"
 *                   feedbacks:
 *                      - _id: "64f123abc123abc123abc204"
 *                        text: "Дуже цікаве місце"
 *                        rating: 5
 *                        owner: "64f123abc123abc123abc205"
 *                        createdAt: "2025-03-01T10:00:00.000Z"
 *                        updatedAt: "2025-03-01T10:00:00.000Z"
 *                   createdAt: "2025-03-01T10:00:00.000Z"
 *                   updatedAt: "2025-03-01T10:00:00.000Z"
 *                   _version: 0
 */
locationRoutes.get(
  '/locations/:locationId',
  celebrate(getlocationByIdSchema),
  getLocatoinById
);

/**
 * @openapi
 * /locations:
 *   post:
 *     tags:
 *       - Locations
 *     summary: Створити нову локацію
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - locationType
 *               - region
 *             properties:
 *               image:
 *                 type: string
 *                 example: "https://example.com/location.jpg"
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 example: "Вічний вогонь"
 *               rate:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 5
 *                 example: 4.5
 *               description:
 *                 type: string
 *                 example: "Пам'ятник воїнам, загиблим під час Другої світової війни"
 *               locationType:
 *                 type: string
 *                 example: "64f123abc123abc123abc201"
 *               region:
 *                 type: string
 *                 example: "64f123abc123abc123abc202"
 *               feedbacks:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "64f123abc123abc123abc204"
 *           examples:
 *             example1:
 *               summary: Example request
 *               value:
 *                 image: "https://example.com/location.jpg"
 *                 name: "Вічний вогонь"
 *                 description: "Пам'ятник воїнам, загиблим під час Другої світової війни"
 *                 locationType: "64f123abc123abc123abc201"
 *                 region: "64f123abc123abc123abc202"
 *     responses:
 *       201:
 *         description: Локацію успішно створено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *             examples:
 *               example1:
 *                 summary: Example response
 *                 value:
 *                   _id: "64f123abc123abc123abc123"
 *                   image: "https://example.com/location.jpg"
 *                   name: "Вічний вогонь"
 *                   locationType:
 *                     _id: "64f123abc123abc123abc201"
 *                     name: "Історичне місце"
 *                     createdAt: "2025-03-01T10:00:00.000Z"
 *                     updatedAt: "2025-03-01T10:00:00.000Z"
 *                   region:
 *                     _id: "64f123abc123abc123abc202"
 *                     name: "Харківська область"
 *                     createdAt: "2025-03-01T10:00:00.000Z"
 *                     updatedAt: "2025-03-01T10:00:00.000Z"
 *                   rate: 4.5
 *                   description: "Пам'ятник воїнам, загиблим під час Другої світової війни"
 *                   owner:
 *                     _id: "64f123abc123abc123abc203"
 *                     name: "Anna"
 *                     email: "anna@example.com"
 *                     avatar: "https://avatar-123.jpeg"
 *                     createdAt: "2025-03-01T10:00:00.000Z"
 *                     updatedAt: "2025-03-01T10:00:00.000Z"
 *                   feedbacks:
 *                     - _id: "64f123abc123abc123abc204"
 *                       text: "Дуже цікаве місце"
 *                       rating: 5
 *                       owner: "64f123abc123abc123abc205"
 *                       createdAt: "2025-03-01T10:00:00.000Z"
 *                       updatedAt: "2025-03-01T10:00:00.000Z"
 *                   createdAt: "2025-03-01T10:00:00.000Z"
 *                   updatedAt: "2025-03-01T10:00:00.000Z"
 *                   _version: 0
 *       400:
 *         description: Помилка валідації
 *         content:
 *           application/json:
 *             examples:
 *               missingFields:
 *                 summary: Обов'язкові поля не передані
 *                 value:
 *                   message: "Validation error"
 *                   details:
 *                     - "Name is required"
 *                     - "Description is required"
 *       401:
 *         description: Користувач не авторизований
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 */
locationRoutes.post(
  '/locations',
  celebrate(createLocationSchema),
  createLocation
);

/**
 * @openapi
 * /locations/{locationId}:
 *   patch:
 *     tags:
 *       - Locations
 *     summary: Оновити локацію
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         schema:
 *           type: string
 *           example: "64f123abc123abc123abc123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 example: "https://example.com/location.jpg"
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 example: "Вічний вогонь"
 *               locationType:
 *                 type: string
 *                 example: "64f123abc123abc123abc201"
 *               region:
 *                 type: string
 *                 example: "64f123abc123abc123abc202"
 *               description:
 *                 type: string
 *                 example: "Оновлений опис локації"
 *           examples:
 *             example1:
 *               summary: Example request
 *               value:
 *                 image: "https://example.com/location.jpg"
 *                 name: "Оновлена назва"
 *                 description: "Оновлений опис локації"
 *                 locationType: "64f123abc123abc123abc201"
 *                 region: "64f123abc123abc123abc202"
 *     responses:
 *       200:
 *         description: Локацію успішно оновлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *             examples:
 *               example1:
 *                 summary: Example response
 *                 value:
 *                   _id: "64f123abc123abc123abc123"
 *                   image: "https://example.com/location.jpg"
 *                   name: "Оновлена назва"
 *                   locationType:
 *                     _id: "64f123abc123abc123abc201"
 *                     name: "Історичне місце"
 *                   region:
 *                     _id: "64f123abc123abc123abc202"
 *                     name: "Харківська область"
 *                   rate: 4.5
 *                   description: "Оновлений опис локації"
 *                   owner:
 *                     _id: "64f123abc123abc123abc203"
 *                     name: "Anna"
 *                     email: "anna@example.com"
 *                   feedbacks: []
 *                   createdAt: "2025-03-01T10:00:00.000Z"
 *                   updatedAt: "2025-03-02T10:00:00.000Z"
 *       400:
 *         description: Помилка валідації
 *         content:
 *           application/json:
 *             examples:
 *               invalidId:
 *                 summary: Невалідний ID
 *                 value:
 *                   message: "Location ID must be valid mongo ID"
 *               validationError:
 *                 summary: Помилка полів
 *                 value:
 *                   message: "Validation error"
 *                   details:
 *                     - "Field name is required"
 *                     - "LocationType must be a valid ObjectId"
 *       404:
 *         description: Локацію не знайдено
 *         content:
 *           application/json:
 *             example:
 *               message: "Location not found"
 *       401:
 *         description: Користувач не авторизований
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 */
locationRoutes.patch(
  '/locations/:locationId',
  celebrate(updateLocationSchema),
  updateLocation
);

export default locationRoutes;
