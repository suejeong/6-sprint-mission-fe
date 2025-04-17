"use client";

import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import PageLayout from '../../../components/common/PageLayout'
import { useParams } from 'next/navigation';
import ArticleHeader from '../../../components/ui/article/detail/ArticleHeader'
import ArticleContent from '../../../components/ui/article/detail/ArticleContent'
import WriteReply from '../../../components/ui/article/detail/WriteReply'
import ReplyList from '../../../components/ui/article/detail/ReplyList'

function ArticlePage() {
    const { id } = useParams();
    const [article, setArticle] = useState([]);

    useEffect(() => {
        if (!id) return;
        const fetchArticle = async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/articles/${id}`
                );
                setArticle(res.data);
            } catch (error) {
                console.error("🚨 에러 발생:", error);
            }
        };

        fetchArticle();
    }, []);
    return (
        <PageLayout>
            <ArticleHeader title={article.title} />
            <ArticleContent content={article.content} />
            <WriteReply />
            <ReplyList />
            <div className="flex justify-center mt-10">
                <button className="btn-base">목록으로 돌아가기</button>
            </div>
        </PageLayout>
    )
}

export default ArticlePage;