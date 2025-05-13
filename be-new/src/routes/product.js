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

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
        where: { id: Number(id) },
    });

    if (!product) {
        return res.status(400).json({ message: 'Not Found' })
    }

    res.json(product);
});

export default router;
