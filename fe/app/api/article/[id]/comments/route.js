
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(req, { params }) {
    const id = params.id;
    const comments = await db.comments.findMany({
        where: { articleId: Number(id) },
    });

    return Response.json(comments);
}