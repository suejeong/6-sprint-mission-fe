import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createProduct = async (req, res) => {
    try {
        const { title, description, price, tags } = req.body;

        const product = await prisma.product.create({
            data: {
                title,
                description,
                price: Number(price),  // 👈 중요!
                tags: {
                    set: tags || [],     // 👈 Prisma에서 `String[]` 배열로 저장할 때
                },
            },
        });

        res.status(201).json(product);
    } catch (error) {
        console.error('❌ 서버 에러:', error);
        res.status(500).json({ message: '서버 에러', error: error.message });
    }
};
