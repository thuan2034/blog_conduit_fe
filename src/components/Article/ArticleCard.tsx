export default function ArticleCard({ blog }: { blog: any }) {
  const createdAt = new Date(blog.createdAt);

  return (
    <div className="group relative p-6 border border-gray-200 rounded-2xl bg-white shadow-md hover:shadow-xl hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1">
      {/* Tiêu đề */}
      <a
        href={`/article/${blog.slug}`}
        className="block text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition"
      >
        {blog.title}
      </a>

      {/* Mô tả */}
      <p className="mt-2 text-gray-600">{blog.description}</p>

      {/* Tác giả và ngày */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div>
          <p>
            ✍️{" "}
            <span className="font-medium text-gray-800">
              {blog.author.userName}
            </span>
          </p>
          <p>
            📅{" "}
            {createdAt.getDate().toString().padStart(2, "0")}/
            {(createdAt.getMonth() + 1).toString().padStart(2, "0")}/
            {createdAt.getFullYear()}
          </p>
        </div>

        {/* Lượt thích */}
        <div className="flex items-center gap-1 text-red-500 font-semibold">
          ❤️ <span>{blog.favoritesCount}</span>
        </div>
      </div>

      {/* Danh sách tag */}
      <div className="mt-4 flex flex-wrap gap-2">
        {blog.tagList.map((tag: string) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full border border-gray-300 bg-gray-50 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Hiệu ứng nền gradient khi hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br from-blue-500 to-pink-500 rounded-2xl transition duration-300 pointer-events-none"></div>
    </div>
  );
}
