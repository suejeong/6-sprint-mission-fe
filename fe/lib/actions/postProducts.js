// 🔽 Next.js의 Server Action을 사용하겠다는 선언
'use server';

import { prisma } from '@/../be-new/prisma/prismaClient';

// 🔽 서버에서 실행될 함수 (브라우저에서 직접 접근 불가)
export async function postProductsAction(formData) {
    // 🔽 formData는 <form> 또는 FormData 객체로부터 전달된 데이터
    const title = formData.get('title');
    const description = formData.get('description');
    const price = parseFloat(formData.get('price'));
    const tags = formData.getAll('tags[]'); // 여러 개 전달된 태그 배열


    // 🔽 DB 저장 로직이 여기에 들어갈 수 있음 (예: Prisma 등)
    const newProduct = {
        title,
        description,
        price,
        tags,
        createdAt: new Date(),
    };

    console.log("✅ 서버에서 받은 데이터:", newProduct);

    // 🔽 클라이언트로 응답 반환
    return { success: true, message: '상품이 등록되었습니다.', product: newProduct };
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