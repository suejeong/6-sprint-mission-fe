import express from 'express';
import { createProduct } from '../controllers/productController.js'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/', createProduct);

router.get('/', async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
});

export default router;
