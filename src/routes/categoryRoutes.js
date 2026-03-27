import { Router } from 'express';
import {
  getCategoriesWithRegions,
  getCategoriesWithLocationTypes,
} from '../controllers/categoryController.js';

const categoryRoutes = Router();

/**
 * @openapi
 * /categories/regions:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Отримати всі категорії з регіонами місць відпочинку
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64f123abc123abc123abc202"
 *                   name:
 *                     type: string
 *                     example: "Харківська область"
 *                   slug:
 *                     type: string
 *                     example: "kharkivska"
 */
categoryRoutes.get('/categories/regions', getCategoriesWithRegions);

/**
 * @openapi
 * /categories/location-types:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Отримати всі категорії з типами локацій місць відпочинку
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64f123abc123abc123abc201"
 *                   name:
 *                     type: string
 *                     example: "Море"
 *                   slug:
 *                     type: string
 *                     example: "more"
 */
categoryRoutes.get('/categories/location-types', getCategoriesWithLocationTypes);

export default categoryRoutes;
