"use client";
import { listArticles } from "@/lib/api/article/list";
import ArticleCard from "@/components/Article/ArticleCard";
import TagList from "@/components/Tag/TagList";
import { getTags } from "@/lib/api/tag/get";
import { getFeed } from "@/lib/api/article/feed";
import { useEffect, useState } from "react";
export default function Home() {
  const [articles, setArticles] = useState([] as any[]);
  const [tags, setTags] = useState([] as any[]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [isFeed, setIsFeed] = useState(false);
  useEffect(() => {
    if (!isFeed) {
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
    }
    else {
      getFeed(10, offset)
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
    }
  }, [offset, isFeed]);
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
  <main className="container mx-auto px-4 mt-10">
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar tag list */}
      <aside className="md:w-1/4 bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3">Danh sách thẻ</h2>
        <TagList tags={tags} />
      </aside>

      {/* Main content */}
      <section className="md:w-3/4 flex-1">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setIsFeed(false)}
            className={`px-4 py-2 rounded ${
              !isFeed ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Global
          </button>
          <button
            onClick={() => setIsFeed(true)}
            className={`px-4 py-2 rounded ${
              isFeed ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Feed
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-6">
          {isFeed ? "Feed" : "Trang chủ"}
        </h1>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          Danh sách bài viết
        </h2>

        {articles.map((article: any) => (
          <div
            className="mb-4 bg-white rounded-lg shadow p-4"
            key={article.id}
          >
            <ArticleCard blog={article} />
          </div>
        ))}

        <div className="text-gray-600 mt-4 space-y-1">
          <p>Tổng bài viết: {total}</p>
          <p>Hiển thị: {articles.length}</p>
          <p>Offset hiện tại: {offset}</p>
        </div>

        {articles.length < total && (
          <button
            onClick={() => setOffset(articles.length)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Load more
          </button>
        )}
      </section>
    </div>
  </main>
);

}
