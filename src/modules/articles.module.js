import express from "express";
import prisma from "../db/prisma/client.prisma.js";

const articlesRouter = express.Router(); // express 프레임워크의 router 모듈을 불러옴

/**
 * 글 작성
 */
articlesRouter.post("/", async (req, res, next) => { // /articles로 들어온 api요청이 articlesRouter.post("/")로 연결
    // req : api의 요청 데이터, res : 서버가 클라이언트에 응답 보낼 때 사용하는 객체, next : 에러 핸들링, 미들웨어처리를 위해 다음 단계로 넘기는 함수
    // req : 클라에서 받은거, res : 돌려줄거
    try {
        const { title, content } = req.body; // 클라에서 보낸 데이터 중 title, content만 받음

        const article = await prisma.articles.create({ // 프리즈마의 articles 테이블에 레코드 생성
            data: {
                title,
                content
            }
        });
        console.log("req.body:", req.body);
        res.status(201).json(article); //201(성공) 하면 json 형태로 article을 보낸다
    } catch (e) {
        next(e);
        console.error("🔥 서버 에러:", e);
    }
});

/**
 * 글 목록 조회하기
 */
articlesRouter.get("/", async (req, res, next) => {
    try {
        const articles = await prisma.articles.findMany({
            data: {
                title,
                content,
                createdAt
            }
        })
        res.json(articles);
    } catch (e) {
        next(e);
    }
});


/**
 * 글 수정
 */
articlesRouter.patch("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const post = await prisma.articles.findUnique({
            where: { id: id },
            data: req.body,
        });
        if (!post) throw new Exception(404, "존재하지 않는 게시글입니다");

        res.json(post);
    } catch (e) {
        next(e);
    }
});



export default articlesRouter;