"use client";
import { getComments } from "@/lib/api/comment/get";
import { useState, useEffect } from "react";
export default function Comments(slug: string) {
  const [comments, setComments] = useState([] as any[]);
  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await getComments(slug);
        setComments(response.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      } 
    }
    fetchComments();
  }, [slug]);
  return (
    <div>
      {comments.map((comment: any) => (
        <div key={comment.id}>
          <p>{comment.body}</p>
          <p className="text-gray-500 text-sm">
            by {comment.author.username} on{" "}
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
          <hr className="my-4" />
        </div>
      ))}
    </div>
  );
}
