"use client"
import { listArticles } from "@/lib/api/article/list";
import ArticleCard from "@/components/Article/ArticleCard";
import { useEffect, useState } from "react";
export default function Home() {
  const [articles, setArticles] = useState([] as any[]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    listArticles(10, offset)
      .then((res) => {
        setTotal(res.data.totalArticles);
        return res.data.articleResponseDtoList; 
      })
      .then((newArticles) => {
      if (offset === 0) {
        // lần đầu hoặc khi reset thì ghi đè
        setArticles(newArticles);
      } else {
        setArticles((prev) => [...prev, ...newArticles]);
      }
    });
  }, [offset]);
  return (
    <main className="container mx-auto px-4 mt-10 ">
      {articles.map((article: any) => (
        <div className="mb-4 bg-white rounded-lg shadow-lg p-4" key={article.id}>
          <ArticleCard blog={article} />
        </div>
      ))}
      <p>{total}</p>
      <p>{articles.length}</p>
      <p>{offset}</p>
      <button hidden={articles.length === total} onClick={() => setOffset(articles.length)}>Load more</button>
    </main>
  );
}
