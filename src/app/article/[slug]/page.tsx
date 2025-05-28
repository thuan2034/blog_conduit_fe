"use client";
import { singleArticle } from "@/lib/api/article/single";
import ArticleOwnPage from "@/components/Article/ArticleOwnPage";
import Comments from "@/components/Comment/Comments";
import { useState, useEffect } from "react";

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [article, setArticle] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { slug } = await params;
        const res = await singleArticle(slug);
        setArticle(res.data);
      } catch (error) {
        console.error("Failed to fetch article:", error);
        setError("Không thể tải bài viết");
      }
    };
    fetchArticle();
  }, [params]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!article) {
    return <div>Đang tải...</div>;
  }

  return (
    <>
    <ArticleOwnPage
      title={article.title}
      description={article.description}
      body={article.body}
      favoritesCount={article.favoritesCount}
      createdAt={article.createdAt}
      tagList={article.tagList}
      author={article.author}
    />
    <Comments slug={article.slug} /> {/* Truyền slug từ article vào Comments */}
  </>
  );
}