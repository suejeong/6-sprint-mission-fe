import axios from 'axios'; // 현재 파일에서 axios를 가져오기 위해 선언

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(req, { params }) {
    const { id } = params;
    const response = await axios.get(`${BASE_URL}/articles/${id}`);
    return Response.json({ id });
}


// ✅ 게시글 수정 (예시: /api/article/[id]/route.js 에 있어야 함)
export async function PATCH(req) {
    const body = await req.json();
    const { id, ...data } = body; // body에서 id와 수정데이터 분리

    const response = await axios.patch(`${BASE_URL}/articles/${id}`, data);
    return Response.json(response.data);
}

