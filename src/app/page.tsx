"use client"
import { listArticles } from "@/lib/api/article/list";
import ArticleCard from "@/components/Article/ArticleCard";
import TagList from "@/components/Tag/TagList";
import { getTags } from "@/lib/api/tag/get";
import { useEffect, useState } from "react";
export default function Home() {
  const [articles, setArticles] = useState([] as any[]);
  const [tags, setTags] = useState([] as any[]);
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
  useEffect(() => {
    getTags()
      .then((res) => {
        setTags(res.data);
        console.log("Tags fetched successfully:", res);
      })
      .catch((error) => {
        console.error("Failed to fetch tags:", error);
      });
  }, []);
  return (
    <main className="container mx-auto px-4 mt-10 ">
      <h1 className="text-3xl font-bold mb-6">Trang chủ</h1>
      <TagList tags={tags}  />
      <h2 className="text-2xl font-semibold mt-6 mb-4">Danh sách bài viết</h2>
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
