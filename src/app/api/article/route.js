import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ✅ 게시글 생성
export async function POST(req) {
    const body = await req.json(); // 요청 body에서 데이터 파싱
    const response = await axios.post(`${BASE_URL}/articles`, body);
    return Response.json(response.data); // 클라이언트에 JSON 응답
}

// ✅ 게시글 목록 조회
export async function GET() {
    const response = await axios.get(`${BASE_URL}/articles`);
    return Response.json(response.data); // 반드시 Response.json 으로 반환
}

