export async function POST(request) {
    const body = await request.json();
    const { name, description, price, tags } = body;

    // 유효성 검사 후 DB 저장
    return new Response(
        JSON.stringify({ message: "등록 성공" }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
}


import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ✅ 아이템 생성
export async function POST(req) {
    const body = await req.json(); // 요청 body에서 데이터 파싱
    const response = await axios.post(`${BASE_URL}/product`, body);
    return Response.json(response.data); // 클라이언트에 JSON 응답
}

// ✅ 아이템 목록 조회
export async function GET() {
    const response = await axios.get(`${BASE_URL}/product`);
    return Response.json(response.data); // 반드시 Response.json 으로 반환
}
