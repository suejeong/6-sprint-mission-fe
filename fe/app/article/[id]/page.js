"use client";

import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import PageLayout from '../../../components/common/PageLayout'
import { useParams } from 'next/navigation';
import ArticleHeader from '../../../components/ui/article/detail/ArticleHeader'
import ArticleContent from '../../../components/ui/article/detail/ArticleContent'
import WriteReply from '../../../components/ui/article/detail/WriteReply'
import CommentList from '../../../components/ui/article/detail/CommentList'
import { getComments } from "../../../app/api/article/[id]/route"
import { useRouter } from 'next/navigation';

export default function ArticlePage() {
    const { id } = useParams();
    const [article, setArticle] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            try {
                const data = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/${id}`);
                const commentData = await getComments({ id });
                setArticle(res.data);
                setComments(commentData);
            } catch (e) {
                console.error(e);
                alert("서버 에러 입니다")
                console.log("🔍 호출 URL:", `${process.env.NEXT_PUBLIC_API_BASE_URL}/article/${id}`);

            } finally {
                setLoading(false);
            }
        }
        fetchArticle();
    }, [id])
    return (
        <PageLayout>
            <ArticleHeader title={article.title} />
            <ArticleContent content={article.content} />
            <WriteReply />
            <CommentList comments={comments} id={id} />
            <div className="flex justify-center mt-10">
                <button className="btn-base" onClick={() => router.back()}>목록으로 돌아가기</button>
            </div>
        </PageLayout>
    )
}