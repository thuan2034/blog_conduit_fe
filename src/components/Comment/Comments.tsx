"use client";
import { getComments } from "@/lib/api/comment/get";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion"; // For animations
import { FaReply, FaExclamationCircle, FaRedo } from "react-icons/fa"; // Icons for reply and error

// Define Comment type for better TypeScript support
interface Comment {
  id: string;
  body: string;
  createdAt: string;
  author: {
    userName: string;
  };
}

interface CommentsProps {
  slug: string;
}

export default function Comments({ slug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch comments
  useEffect(() => {
    async function fetchComments() {
      try {
        setLoading(true);
        setError(null);
        const response = await getComments(slug);
        setComments(response.data || []);
        if (!response.data || response.data.length === 0) {
          setError("Chưa có bình luận nào cho bài viết này.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        setError("Không thể tải bình luận, vui lòng thử lại sau.");
        setLoading(false);
      }
    }
    fetchComments();
  }, [slug]);

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-pulse"
        >
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );

  // Retry fetch
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    // Trigger useEffect by resetting slug or manually calling fetch
    setComments([]);
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <SkeletonLoader />
      </div>
    );
  }

  if (error && comments.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <FaExclamationCircle className="text-red-500 text-3xl" />
          <p className="text-gray-600">{error}</p>
          <button
            onClick={handleRetry}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="Thử lại"
          >
            <FaRedo /> Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Comment Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
          Bình luận ({comments.length})
        </h2>
      </div>

      {/* Comments List */}
      <AnimatePresence>
        <div className="space-y-6">
          {comments.map((comment) => {
            const date = format(new Date(comment.createdAt), "dd/MM/yyyy HH:mm");

            return (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
              >
                {/* Comment Content */}
                <p className="text-gray-800 leading-relaxed mb-4">
                  {comment.body}
                </p>

                {/* Footer: Author, Date, and Reply Button */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">
                      {comment.author.userName}
                    </span>
                    <time dateTime={comment.createdAt} className="italic">
                      {date}
                    </time>
                  </div>
                  <button
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                    aria-label="Trả lời bình luận"
                    disabled // Placeholder for reply functionality
                  >
                    <FaReply /> Trả lời
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>

      {/* No Comments Fallback */}
      {comments.length === 0 && (
        <p className="text-gray-500 italic text-center py-8">
          Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
        </p>
      )}
    </div>
  );
}