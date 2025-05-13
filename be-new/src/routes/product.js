import express from 'express';
import { createProduct } from '../controllers/productController.js'

const prisma = new PrismaClient();
const router = express.Router();

router.post('/', createProduct);

router.get('/', async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
});

export default router;
