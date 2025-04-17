import React from 'react'
import BestArticleCard from '../../components/ui/article/BestArticleCard'
import H2Title from '../../components/common/H2Title'
import BtnWriteArticle from '../../components/ui/article/BtnWriteArticle'
import Search from '../../components/ui/article/Search'
import Sorting from '../../components/ui/article/Sorting'
import ArticleList from '../../components/ui/article/ArticleList'
import PageLayout from '../../components/common/PageLayout'

function ArticlePage() {
    return (
        <PageLayout>
            <H2Title>베스트 게시글</H2Title>
            <BestArticleCard />
            <div className="flex justify-between">
                <H2Title className="flex-1">게시판</H2Title>
                <BtnWriteArticle />
            </div>
            <div className="flex justify-between gap-2.5 items-center mt-4 sm:mb-4 md:mb-10">
                <Search />
                <Sorting />
            </div>
            <ArticleList />
        </PageLayout>
    )
}

export default ArticlePage;