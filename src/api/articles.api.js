import axios from 'axios'; // 현재 파일에서 axios를 가져오기 위해 선언

export const postArticle = async ({ title, content }) => {
    const response = await axios.post('http://localhost:7777/articles', { // await로 서버 응답 기다림
        title, //req.body로 받는 데이터
        content,
    });
    return response.data; // 서버가 보내준 데이터만 클라이언트에 전달
}

export const getArticles = async () => {
    const response = await axios.get('http://localhost:7777/articles', { // await로 서버 응답 기다림
        title, //req.body로 받는 데이터
        content,
        createdAt,
    });
    return response.data; // 서버가 보내준 데이터만 클라이언트에 전달
}