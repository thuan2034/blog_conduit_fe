"use client";
import { getComments } from "@/lib/api/comment/get";
import { useState, useEffect } from "react";

export default function Comments({ slug }: { slug: string }) {
  const [comments, setComments] = useState([] as any[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        setLoading(true);
        const response = await getComments(slug);
        setComments(response.data);
        if (!response.data || response.data.length === 0) {
          setError("Không có bình luận nào cho bài viết này.");
        }
        setLoading(false);
        console.log("Comments fetched successfully:", response.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        setError("Không thể tải bình luận, vui lòng thử lại sau.");
        setLoading(false);
      }
    }
    fetchComments();
  }, [slug]);

  if (loading) {
    return <div>Đang tải bình luận...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {comments.map((comment: any) => (
        <div key={comment.id}>
          <p>{comment.body}</p>
          <p className="text-gray-500 text-sm">
            by {comment.author.userName} on{" "}
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
          <hr className="my-4" />
        </div>
      ))}
    </div>
  );
}