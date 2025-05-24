"use client"
import { listArticles } from "@/lib/api/article/list";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import { useEffect, useState } from "react";
export default function Home() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    listArticles()
    .then((res) => res.data.articleResponseDtoList)
    .then((res) => setArticles(res));
  }, []);
  return (
    <main className="container mx-auto px-4 mt-10 ">
      {articles.map((article: any) => (
        <div className="mb-4 bg-white rounded-lg shadow-lg p-4" key={article.id}>
          <ArticleCard blog={article} />
        </div>
      ))}
    </main>
  );
}
