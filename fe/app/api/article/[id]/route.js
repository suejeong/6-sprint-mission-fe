import axios from 'axios'; // 현재 파일에서 axios를 가져오기 위해 선언

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(req, { params }) {
    const { id } = params;
    const response = await axios.get(`${BASE_URL}/articles/${id}`);
    return Response.json({ id });
}

export async function GET(req, { params }) {
    const id = params.id;
    const comments = await db.comments.findMany({
        where: { articleId: Number(id) },
    });

    return Response.json(comments);
}