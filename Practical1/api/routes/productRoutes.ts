import express from 'express';
import { getProductsWithPricing } from '../controllers/productController';

const router = express.Router();

router.get('/', getProductsWithPricing);

export default router;
