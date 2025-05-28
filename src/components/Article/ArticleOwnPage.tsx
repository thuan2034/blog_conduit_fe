import { format } from "date-fns";

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
}) {
  return (
    <>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
        <p>{body}</p> {/* Nếu là markdown/HTML, xem xét dùng cách khác */}
        <p>Số lượt yêu thích: {favoritesCount}</p>
        <p>{format(new Date(createdAt), "dd/MM/yyyy HH:mm")}</p>
        <p>{tagList ? tagList.join(", ") : "Không có tag"}</p>
      </div>
      <div>
        {author ? (
          <>
            <p>Tác giả: {author.userName}</p>
            <p>Tiểu sử: {author.bio || "Không có"}</p>
            <p>Hình ảnh: {author.image || "Không có"}</p>
            <p>{author.following ? "Đang theo dõi" : "Không theo dõi"}</p>
          </>
        ) : (
          <p>Thông tin tác giả không khả dụng</p>
        )}
      </div>
    </>
  );
}