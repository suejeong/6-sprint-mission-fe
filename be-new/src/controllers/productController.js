import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createProduct = async (req, res) => {
    try {
        const { title, description, price } = req.body;

        const product = await prisma.product.create({
            data: {
                title,
                description,
                price: Number(price),
            },
        });

        return res.status(200).json({ message: 'Product created', product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}