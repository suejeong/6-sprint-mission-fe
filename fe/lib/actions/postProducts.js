// 🔽 Next.js의 Server Action을 사용하겠다는 선언
'use server';

import { prisma } from '@/../be-new/prisma/prismaClient';

export async function POST(request) {
    const body = await request.json();
    const { title, description, price, tags } = body;

    if (!title || !description || isNaN(price)) {
        return new Response(JSON.stringify({
            message: '필수 항목을 모두 입력해주세요.',
        }), { status: 400 });
    }

    const newProduct = {
        id: Date.now(),
        title,
        description,
        price,
        tags,
        createdAt: new Date(),
    };

    console.log("✅ 저장된 상품:", newProduct);

    return new Response(JSON.stringify({
        message: '등록 완료',
        product: newProduct,
    }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    });
}


export async function getProduct(id) {
    const product = await prisma.product.findUnique({
        where: { id: Number(id) },
    });
    return product;
}

export async function getAllProducts() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
    });
    return products;
}