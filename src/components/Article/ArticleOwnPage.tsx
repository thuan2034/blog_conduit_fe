import { format } from "date-fns";
import Image from "next/image";
interface Author {
  userName: string;
  bio: string | null;
  image: string | null;
  following: boolean;
}

export default function ArticleOwnPage({
  title,
  description,
  body,
  favoritesCount,
  createdAt,
  tagList,
  author,
}: {
  title: string;
  description: string;
  body: string;
  favoritesCount: number;
  createdAt: string;
  tagList: string[];
  author: Author;
}) {  const formattedDate = format(new Date(createdAt), "dd/MM/yyyy HH:mm");
  return (
      <main className="flex flex-col md:flex-row w-full min-h-screen bg-gray-100">
      {/* 1. Cột trái: Nội dung bài viết */}
      <article className="w-full md:w-3/4 bg-white p-8 md:pl-12 md:pr-8">
        {/* Header: Tiêu đề, mô tả, metadata */}
        <header className="mb-12">
          {/* Tiêu đề lớn */}
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            {title}
          </h1>
          {/* Mô tả (subheading) */}
          <p className="text-2xl text-gray-600 mb-8">{description}</p>

          {/* Metadata: ngày đăng & lượt thích */}
          <div className="flex items-center gap-8 text-sm text-gray-500">
            {/* Like */}
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.656l-6.828-6.828a4 4 0 010-5.656z" />
              </svg>
              <span className="font-medium">{favoritesCount} lượt yêu thích</span>
            </div>

            {/* Ngày đăng */}
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3M3 11h18M5 11V7a1 1 0 011-1h1m10 0h1a1 1 0 011 1v4M5 11v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m4-11h2a1 1 0 011 1v9a1 1 0 01-1 1h-2M9 21h6"
                />
              </svg>
              <time dateTime={createdAt} className="font-medium">
                {formattedDate}
              </time>
            </div>
          </div>

          {/* Tag list (nếu có) */}
          {tagList.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {tagList.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full hover:bg-blue-200 hover:text-blue-900 transition-colors duration-200 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Body bài viết */}
        <section className="prose prose-lg max-w-none text-gray-800">
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </section>
      </article>

      {/* 2. Cột phải: Thông tin tác giả */}
      <aside className="w-full md:w-1/4 bg-white border-l border-gray-200 p-8 md:pr-12 md:pl-8">
        <div className="flex flex-col items-center">
          {/* Avatar */}
          {author.image ? (
            <Image
              src={author.image}
              alt={author.userName}
              width={120}
              height={120}
              className="w-30 h-30 rounded-full object-cover"
            />
          ) : (
            <div className="w-30 h-30 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-3xl text-gray-500">
                {author.userName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* Tên tác giả */}
          <h2 className="mt-4 text-2xl font-semibold text-gray-900">
            {author.userName}
          </h2>

          {/* Tiểu sử */}
          <p className="mt-2 text-gray-600 text-center">
            {author.bio || "Chưa có tiểu sử."}
          </p>

          {/* Nút Theo dõi */}
          <button
            className={`mt-6 px-6 py-2 text-white font-medium rounded-full transition-colors duration-200 ${
              author.following
                ? "bg-gray-400 hover:bg-gray-500"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {author.following ? "Đang theo dõi" : "Theo dõi"}
          </button>
        </div>
      </aside>
    </main>
  );
}