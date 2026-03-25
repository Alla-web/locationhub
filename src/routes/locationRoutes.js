import { Router } from 'express';

import { getAllLocations } from '../controllers/locationController.js';

const locationRoutes = Router();

/**
 * @openapi
 * /locations:
 *    get:
 *     tags:
 *      - Locations
 *     summary: Отримати всіх користувачів
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *            items:
 *               $ref: '#/components/schemas/Location'
 *            examples:
 *               example1:
 *                 summary: Example response
 *                 value:
 *                   _id: '64f123abc'
 *                   name: 'Kharkiv'
 */
locationRoutes.get('/locations', getAllLocations);

export default locationRoutes;
