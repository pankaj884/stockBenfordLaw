import express from 'express';
import { getSampleData } from '../controllers/stockController';

const router = express.Router();

router.get('/', getSampleData);

export default router;
