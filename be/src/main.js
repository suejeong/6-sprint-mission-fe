import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'yaml';
import { create } from 'superstruct';
import { prismaClient } from './prismaClient.js';
import { asyncErrorHandler } from './utils/asyncErrorHandler.js';

import { ExceptionMessage } from '../constant/ExceptionMessage.js';

import { Article } from './models/Article.js';
import { Comment } from './models/Comment.js';
import { Product } from './models/Product.js';

import { CreateArticleRequestStruct } from './structs/article/CreateArticleRequestStruct.js';
import { UpdateArticleRequestStruct } from './structs/article/UpdateArticleRequestStruct.js';
import { GetArticleListRequestStruct } from './structs/article/GetArticleListRequestStruct.js';
import { CreateCommentRequestStruct } from './structs/comment/CreateCommentRequestStruct.js';
import { GetCommentListRequestStruct } from './structs/comment/GetCommentListRequestStruct.js';
import { UpdateCommentRequestStruct } from './structs/comment/UpdateCommentRequestStruct.js';
import { CreateProductRequestStruct } from './structs/product/CreateProductRequestStruct.js';
import { UpdateProductRequestStruct } from './structs/product/UpdateProductRequestStruct.js';
import { GetProductListRequestStruct } from './structs/product/GetProductListRequestStruct.js';

dotenv.config({ path: path.join(path.resolve(), '.env') });

const app = express();
app.use(cors({
    //origin: ['http://localhost:3001', 'https://6-sprint-mission-p1ktj9wk5-sues-projects-3420d095.vercel.app'],
    origin: '*', // 🔥 개발용: 모든 origin 허용
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: false,
}));
app.use(express.json());
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(
        yaml.parse(fs.readFileSync(path.join(path.resolve(), 'openapi.yaml'), 'utf-8')),
        {
            customJs: [
                'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
            ],
            customCssUrl: [
                'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
            ],
        },
    ),
);

/** Articles Routes **/

// 게시글 등록 api
app.post(
    '/articles',
    asyncErrorHandler(async (req, res) => {
        /**
         * [API 요청 유효성 검사]
         *
         * assert 메서드는 유효성 검사만 시도하는데 비해,
         * create 메서드는 데이터를 전처리하고, 유효성 검사를 같이 시도합니다.
         *
         * 전처리를 하는 이유는 아래와 같이 다양합니다.
         * - 기본값을 설정하기 위해              @see GetArticleListRequestStruct
         * - 데이터를 변환하기 위해
         *     1. 문자열 앞뒤에 있는 공백 제거    @see CreateArticleRequestStruct
         *     2. 문자열로 이루어진 숫자 -> 숫자  @see GetArticleListRequestStruct
         *     ...
         */
        const { title, content } = create(req.body, CreateArticleRequestStruct);

        const articleEntity = await prismaClient.article.create({
            data: {
                title,
                content,
            },
        });

        /**
         * [클래스 객체로 변환]
         *
         * articleEntity 는 Article 클래스의 인스턴스가 아니므로,
         * Article 클래스에 정의된 메서드를 사용할 수 없습니다.
         */
        const article = new Article(articleEntity);

        return res.status(201).send({
            id: article.getId(),
            title: article.getTitle(),
            content: article.getContent(),
            createdAt: article.getCreatedAt(),
        });
    }),
);

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

// 게시글 목록 조회 api
app.get(
    '/articles',
    asyncErrorHandler(async (req, res) => {
        const { cursor, take, orderBy, word } = create(req.query, GetArticleListRequestStruct);

        const articleEntities = await prismaClient.article.findMany({
            cursor: cursor
                ? {
                    id: cursor,
                }
                : undefined,
            take: take + 1,
            orderBy: orderBy === 'recent' ? { id: 'desc' } : { id: 'asc' },
            where: {
                title: word ? { contains: word } : undefined,
            },
        });

        const articles = articleEntities.map((articleEntity) => new Article(articleEntity));

        const hasNext = articles.length === take + 1;

        return res.send({
            data: articles.slice(0, take).map((article) => ({
                id: article.getId(),
                title: article.getTitle(),
                content: article.getContent(),
                createdAt: article.getCreatedAt(),
            })),
            hasNext,
            nextCursor: hasNext ? articles[articles.length - 1].getId() : null,
        });
    }),
);

// 게시글 댓글 등록 api
app.post(
    '/articles/:articleId/comments',
    asyncErrorHandler(async (req, res) => {
        const { articleId } = req.params;
        const { content } = create(req.body, CreateCommentRequestStruct);

        /**
         * [게시글 댓글 등록 트랜잭션]
         *
         * 1. 게시글이 존재하는지 확인합니다.
         * 2. 게시글이 존재한다면, 댓글을 등록합니다.
         */
        const commentEntity = await prismaClient.$transaction(async (tx) => {
            const targetArticleEntity = await tx.article.findUnique({
                where: {
                    id: Number(articleId),
                },
            });

            if (!targetArticleEntity) {
                return res.status(404).send({ message: ExceptionMessage.ARTICLE_NOT_FOUND });
            }

            return await tx.comment.create({
                data: {
                    articleId: Number(articleId),
                    content,
                },
            });
        });

        const comment = new Comment(commentEntity);

        return res.status(201).send({
            id: comment.getId(),
            content: comment.getContent(),
            createdAt: comment.getCreatedAt(),
        });
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

/** Comments Routes **/

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

/** Products Routes **/

// 상품 등록 api
app.post(
    '/products',
    asyncErrorHandler(async (req, res) => {
        const { name, description, price, tags } = create(req.body, CreateProductRequestStruct);

        const productEntity = await prismaClient.product.create({
            data: {
                name,
                description,
                price,
                tags,
            },
        });

        const product = new Product(productEntity);

        return res.status(201).send({
            id: product.getId(),
            name: product.getName(),
            description: product.getDescription(),
            price: product.getPrice(),
            tags: product.getTags(),
            createdAt: product.getCreatedAt(),
        });
    }),
);

// 상품 조회 api
app.get(
    '/products/:productId',
    asyncErrorHandler(async (req, res) => {
        const { productId } = req.params;

        const productEntity = await prismaClient.product.findUnique({
            where: {
                id: Number(productId),
            },
        });

        if (!productEntity) {
            return res.status(404).send({ message: ExceptionMessage.PRODUCT_NOT_FOUND });
        }

        const product = new Product(productEntity);

        return res.send({
            id: product.getId(),
            name: product.getName(),
            description: product.getDescription(),
            price: product.getPrice(),
            tags: product.getTags(),
            createdAt: product.getCreatedAt(),
        });
    }),
);

// 상품 수정 api
app.patch(
    '/products/:productId',
    asyncErrorHandler(async (req, res) => {
        const { productId } = req.params;
        const { name, description, price, tags } = create(req.body, UpdateProductRequestStruct);

        const productEntity = await prismaClient.$transaction(async (tx) => {
            const targetProductEntity = await tx.product.findUnique({
                where: {
                    id: Number(productId),
                },
            });

            if (!targetProductEntity) {
                return res.status(404).send({ message: ExceptionMessage.PRODUCT_NOT_FOUND });
            }

            return await tx.product.update({
                where: {
                    id: Number(productId),
                },
                data: {
                    name,
                    description,
                    price,
                    tags,
                },
            });
        });

        const product = new Product(productEntity);

        return res.send({
            id: product.getId(),
            name: product.getName(),
            description: product.getDescription(),
            price: product.getPrice(),
            tags: product.getTags(),
            createdAt: product.getCreatedAt(),
        });
    }),
);

// 상품 삭제 api
app.delete(
    '/products/:productId',
    asyncErrorHandler(async (req, res) => {
        const { productId } = req.params;

        await prismaClient.$transaction(async (tx) => {
            const targetProductEntity = await tx.product.findUnique({
                where: {
                    id: Number(productId),
                },
            });

            if (!targetProductEntity) {
                return res.status(404).send({ message: ExceptionMessage.PRODUCT_NOT_FOUND });
            }

            return await tx.product.delete({
                where: {
                    id: Number(productId),
                },
            });
        });

        return res.status(204).send();
    }),
);

// 상품 목록 조회 api
app.get(
    '/products',
    asyncErrorHandler(async (req, res) => {
        const { skip, take, orderBy, word } = create(req.query, GetProductListRequestStruct);

        const whereClause = word
            ? {
                OR: [
                    {
                        name: {
                            contains: word,
                        },
                    },
                    {
                        description: {
                            contains: word,
                        },
                    },
                ],
            }
            : undefined;

        const matchedProductCount = await prismaClient.product.count({ where: whereClause });

        const productEntities = await prismaClient.product.findMany({
            skip,
            take,
            orderBy: orderBy === 'recent' ? { id: 'desc' } : { id: 'asc' },
            where: whereClause,
        });

        const products = productEntities.map((productEntity) => new Product(productEntity));

        return res.send({
            count: matchedProductCount,
            data: products.slice(0, take).map((product) => ({
                id: product.getId(),
                name: product.getName(),
                description: product.getDescription(),
                price: product.getPrice(),
                tags: product.getTags(),
                createdAt: product.getCreatedAt(),
            })),
        });
    }),
);

// 상품 댓글 등록 api
app.post(
    '/products/:productId/comments',
    asyncErrorHandler(async (req, res) => {
        const { productId } = req.params;
        const { content } = create(req.body, CreateCommentRequestStruct);

        const commentEntity = await prismaClient.$transaction(async (tx) => {
            const targetProductEntity = await tx.product.findUnique({
                where: {
                    id: Number(productId),
                },
            });

            if (!targetProductEntity) {
                return res.status(404).send({ message: ExceptionMessage.PRODUCT_NOT_FOUND });
            }

            return await tx.comment.create({
                data: {
                    productId: Number(productId),
                    content,
                },
            });
        });

        const comment = new Comment(commentEntity);

        return res.status(201).send({
            id: comment.getId(),
            content: comment.getContent(),
            createdAt: comment.getCreatedAt(),
        });
    }),
);

// 상품 댓글 목록 조회 api
app.get(
    '/products/:productId/comments',
    asyncErrorHandler(async (req, res) => {
        const { productId } = req.params;
        const { cursor, take } = create(req.query, GetCommentListRequestStruct);

        const commentEntities = await prismaClient.$transaction(async (tx) => {
            const targetProductEntity = await tx.product.findUnique({
                where: {
                    id: Number(productId),
                },
            });

            if (!targetProductEntity) {
                return res.status(404).send({ message: ExceptionMessage.PRODUCT_NOT_FOUND });
            }

            return await tx.comment.findMany({
                cursor: cursor
                    ? {
                        id: cursor,
                    }
                    : undefined,
                take: take + 1,
                where: {
                    productId: Number(productId),
                },
            });
        });

        const comments = commentEntities.map((commentEntity) => new Comment(commentEntity));

        const hasNext = comments.length === take + 1;

        return res.send({
            data: comments.slice(0, take).map((comment) => ({
                id: comment.getId(),
                productId: comment.getProductId(),
                content: comment.getContent(),
                createdAt: comment.getCreatedAt(),
            })),
            hasNext,
            nextCursor: hasNext ? comments[comments.length - 1].getId() : null,
        });
    }),
);

app.listen(process.env.HTTP_PORT || 3000, () => console.log('Server started'));
