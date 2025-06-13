"use client"

import React from 'react'
import ArticleLayout from "@/app/article/layout";
import ArticlePageComponent from './ui/article/ArticlePageComponent';

function HomePageComponent() {
  return (
    <ArticleLayout>
      <ArticlePageComponent />
    </ArticleLayout>
  )
}

export default HomePageComponent