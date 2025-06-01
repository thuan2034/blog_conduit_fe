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
    const fetch = async () => {
      const res = isFeed
        ? await getFeed(10, offset)
        : await listArticles(10, offset);
      const newArticles = res.data.articleResponseDtoList;
      setTotal(res.data.totalArticles);

      setArticles((prev) =>
        offset === 0 ? newArticles : [...prev, ...newArticles]
      );
    };
    fetch();
  }, [offset, isFeed]);

  useEffect(() => {
    // Reset offset khi đổi giữa feed và global
    setOffset(0);
  }, [isFeed]);

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
    <main className="w-full px-0 mt-10">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar tag list */}
        <aside className="md:w-1/4 bg-white pr-5 pl-2 pt-5 pb-5 border-r border-gray-200">
  <h2 className="text-xl font-bold mb-4 text-gray-800">
    📌 Danh sách thẻ
  </h2>
  {tags.length ? (
    <TagList tags={tags} />
  ) : (
    <p className="text-gray-500 italic">Không có thẻ nào</p>
  )}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article: any) => (
              <div key={article.id}>
                <ArticleCard blog={article} />
              </div>
            ))}
          </div>

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
