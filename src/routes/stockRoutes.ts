import express from 'express';
import { getBLDataForStock } from '../controllers/stockController';

const router = express.Router();

/**
 * @swagger
 * /stocks/{stockName}:
 *  get:
 *    summary: Get stock data for a given stock name
 *    parameters:
 *      - in: path
 *        name: stockName
 *        schema:
 *          type: string
 *          default: "AMRN"
 *        required: true
 *        description: The stock name
 *    responses:
 *      200:
 *        description: Successful response
 */
router.get('/:stockName', getBLDataForStock);

export default router;
