// app/api/articles/[id]/route.js
// 글 하나 조회(GET), 수정(PUT), 삭제(DELETE)
import prisma from "../../../lib/prisma";


// 게시글 조회 api
app.get(
    '/articles/:articleId',
    asyncErrorHandler(async (req, res) => {
        const { articleId } = req.params;

        const articleEntity = await prismaClient.article.findUnique({
            where: {
                id: Number(articleId), // params 에서 가져온 값은 문자열이므로, 여기서는 숫자로 변환하여 사용해야 합니다.
            },
        });

        if (!articleEntity) {
            return res.status(404).send({ message: ExceptionMessage.ARTICLE_NOT_FOUND });
        }

        const article = new Article(articleEntity);

        return res.send({
            id: article.getId(),
            title: article.getTitle(),
            content: article.getContent(),
            createdAt: article.getCreatedAt(),
        });
    }),
);


// 게시글 수정 api
app.patch(
    '/articles/:articleId',
    asyncErrorHandler(async (req, res) => {
        const { articleId } = req.params;
        const { title, content } = create(req.body, UpdateArticleRequestStruct);

        /**
         * [게시글 수정 트랜잭션]
         *
         * 1. 게시글을 수정하기 전에 해당 게시글이 존재하는지 확인합니다.
         * 2. 게시글이 존재한다면, 게시글을 수정합니다.
         *
         * update() 하나만 사용해도 결과적으로는 동일합니다.
         */
        const articleEntity = await prismaClient.$transaction(async (tx) => {
            const targetArticleEntity = await tx.article.findUnique({
                where: {
                    id: Number(articleId),
                },
            });

            if (!targetArticleEntity) {
                return res.status(404).send({ message: ExceptionMessage.ARTICLE_NOT_FOUND });
            }

            return await tx.article.update({
                where: {
                    id: Number(articleId),
                },
                data: {
                    title,
                    content,
                },
            });
        });

        const article = new Article(articleEntity);

        return res.send({
            id: article.getId(),
            title: article.getTitle(),
            content: article.getContent(),
            createdAt: article.getCreatedAt(),
        });
    }),
);


// 게시글 삭제 api
app.delete(
    '/articles/:articleId',
    asyncErrorHandler(async (req, res) => {
        const { articleId } = req.params;

        await prismaClient.$transaction(async (tx) => {
            const targetArticleEntity = await tx.article.findUnique({
                where: {
                    id: Number(articleId),
                },
            });

            if (!targetArticleEntity) {
                return res.status(404).send({ message: ExceptionMessage.ARTICLE_NOT_FOUND });
            }

            return await tx.article.delete({
                where: {
                    id: Number(articleId),
                },
            });
        });

        return res.status(204).send();
    }),
);


// 게시글 댓글 목록 조회 api
app.get(
    '/articles/:articleId/comments',
    asyncErrorHandler(async (req, res) => {
        const { articleId } = req.params;
        const { cursor, take } = create(req.query, GetCommentListRequestStruct);

        const commentEntities = await prismaClient.$transaction(async (tx) => {
            const targetArticleEntity = await tx.article.findUnique({
                where: {
                    id: Number(articleId),
                },
            });

            if (!targetArticleEntity) {
                return res.status(404).send({ message: ExceptionMessage.ARTICLE_NOT_FOUND });
            }

            return await tx.comment.findMany({
                cursor: cursor
                    ? {
                        id: cursor,
                    }
                    : undefined,
                take: take + 1,
                where: {
                    articleId: Number(articleId),
                },
            });
        });

        const comments = commentEntities.map((commentEntity) => new Comment(commentEntity));

        const hasNext = comments.length === take + 1;

        return res.send({
            data: comments.slice(0, take).map((comment) => ({
                id: comment.getId(),
                articleId: comment.getArticleId(),
                content: comment.getContent(),
                createdAt: comment.getCreatedAt(),
            })),
            hasNext,
            nextCursor: hasNext ? comments[comments.length - 1].getId() : null,
        });
    }),
);


// 댓글 수정 api
app.patch(
    '/comments/:commentId',
    asyncErrorHandler(async (req, res) => {
        const { commentId } = req.params;
        const { content } = create(req.body, UpdateCommentRequestStruct);

        const commentEntity = await prismaClient.$transaction(async (tx) => {
            const targetCommentEntity = await tx.comment.findUnique({
                where: {
                    id: Number(commentId),
                },
            });

            if (!targetCommentEntity) {
                return res.status(404).send({ message: ExceptionMessage.COMMENT_NOT_FOUND });
            }

            return await tx.comment.update({
                where: {
                    id: Number(commentId),
                },
                data: {
                    content,
                },
            });
        });

        const comment = new Comment(commentEntity);

        return res.send({
            id: comment.getId(),
            articleId: comment.getArticleId(),
            productId: comment.getProductId(),
            content: comment.getContent(),
            createdAt: comment.getCreatedAt(),
        });
    }),
);

// 댓글 삭제 api
app.delete(
    '/comments/:commentId',
    asyncErrorHandler(async (req, res) => {
        const { commentId } = req.params;

        await prismaClient.$transaction(async (tx) => {
            const targetCommentEntity = await tx.comment.findUnique({
                where: {
                    id: Number(commentId),
                },
            });

            if (!targetCommentEntity) {
                return res.status(404).send({ message: ExceptionMessage.COMMENT_NOT_FOUND });
            }

            return await tx.comment.delete({
                where: {
                    id: Number(commentId),
                },
            });
        });

        return res.status(204).send();
    }),
);



