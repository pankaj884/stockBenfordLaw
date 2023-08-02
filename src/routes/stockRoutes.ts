import express from 'express';
import { getHistoricalData } from '../controllers/stockController';

const router = express.Router();

/**
 * @swagger
 * /stock/{stockName}:
 *  get:
 *    summary: Get stock data for a given stock name
 *    parameters:
 *      - in: path
 *        name: stockName
 *        schema:
 *          type: string
 *        required: true
 *        description: The stock name
 *    responses:
 *      200:
 *        description: Successful response
 */
router.get('/:stockName', getHistoricalData);

export default router;
