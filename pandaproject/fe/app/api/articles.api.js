import axios from 'axios'; // 현재 파일에서 axios를 가져오기 위해 선언

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const postArticle = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/articles`, data);
    return response.data; // 서버가 보내준 데이터만 클라이언트에 전달
}


export const getArticles = async () => {
    const response = await axios.get(`${BASE_URL}/api/articles`);
    return response.data;
}

export const patchArticles = async (id, data) => {
    const response = await axios.patch(`${BASE_URL}/api/articles/${id}`, data);
    return response.data;
}


export async function GET() {
    return new Response(JSON.stringify([{ id: 1, title: "테스트 게시글" }]), {
        headers: { "Content-Type": "application/json" },
    });
}