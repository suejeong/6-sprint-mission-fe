"use client"

import React from 'react'
import ArticleLayout from "@/app/article/layout";
import ArticlePageComponent from '@/components/HomePageComponent';

function Home() {
  return (
    <ArticleLayout>
      <ArticlePageComponent />
    </ArticleLayout>
  )
}

export default Home