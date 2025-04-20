import axios from 'axios'; // 현재 파일에서 axios를 가져오기 위해 선언

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getArticle = async ({ id }) => {
    const response = await axios.get(`${BASE_URL}/articles/${id}`);
    return response.data;
}

export const getComments = async ({ id }) => {
    const response = await axios.get(`${BASE_URL}/articles/${id}/comments`);
    return response.data.data;
}