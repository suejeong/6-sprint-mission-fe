import Head from "next/head";
import ArticlePage from "./article/page";
import ArticleLayout from "./article/layout";

export default function Home() {
  return (
    <ArticleLayout>
      <ArticlePage />
    </ArticleLayout>
  );
}
