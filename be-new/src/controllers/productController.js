import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, tags } = req.body;

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: Number(price),
                tags: tags ?? [],
            },
        });

        res.status(201).json(product);
    } catch (error) {
        console.error('❌ 서버 에러:', error);
        res.status(500).json({ message: '서버 에러', error: error.message });
    }
};
