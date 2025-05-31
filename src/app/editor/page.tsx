"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { createArticle } from "@/lib/api/article/create";
import { getTags } from "@/lib/api/tag/get";

export default function EditorPage() {
  // Lấy router để chuyển hướng khi cần
  const router = useRouter();

  // Lấy token và user từ AuthContext
  const { token } = useAuth();

  // Các state của form tạo bài viết
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState<string>("");
  const [allTags, setAllTags] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 1. KIỂM TRA AUTH: nếu chưa có token, redirect về /login
  useEffect(() => {
    if (token === null) {
      // Chuyển ngay sang trang đăng nhập
      router.push("/login");
    }
    // Lưu ý: chỉ chạy khi token thay đổi
  }, [token, router]);

  // 2. Fetch tất cả tags từ server
  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await getTags();
        const list: string[] = res.data.map((obj: { name: string }) => obj.name);
        setAllTags(list);
      } catch (err) {
        console.error("Lỗi khi fetch tags từ server:", err);
      }
    }
    fetchTags();
  }, []);

  // 3. Tạo danh sách suggestions khi user gõ inputTag
  useEffect(() => {
    if (inputTag.trim() === "") {
      setSuggestions([]);
      return;
    }
    const keyword = inputTag.trim().toLowerCase();
    const filtered = allTags.filter(
      (tag) => tag.toLowerCase().includes(keyword) && !tagList.includes(tag)
    );
    setSuggestions(filtered);
  }, [inputTag, allTags, tagList]);

  // 4. Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 5. Các hàm xử lý tag
  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed !== "" && !tagList.includes(trimmed)) {
      setTagList((prev) => [...prev, trimmed]);
    }
    setInputTag("");
    setIsDropdownVisible(false);
  };

  const removeTag = (tag: string) => {
    setTagList((prev) => prev.filter((t) => t !== tag));
  };

  const handleKeyDownOnTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputTag.trim() !== "") {
        addTag(inputTag);
      }
    }
    if (e.key === "Backspace" && inputTag === "" && tagList.length > 0) {
      const lastTag = tagList[tagList.length - 1];
      removeTag(lastTag);
    }
  };

  // 6. Xử lý submit form tạo article
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createArticle({ title, description, body, tagList });
      setSuccess("Bài viết đã được tạo thành công!");
      setError(null);
      setTitle("");
      setDescription("");
      setBody("");
      setTagList([]);
    } catch (err) {
      console.error("Failed to create article:", err);
      setError("Không thể tạo bài viết");
      setSuccess(null);
    }
  };

  // Nếu token null, ta đã redirect ở useEffect trên, nên không cần render nội dung form
  if (token === null) {
    return null;
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Tạo Bài Viết Mới</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Tiêu đề:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Mô tả:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Nội dung:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={6}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        <div ref={wrapperRef} className="relative">
          <label className="block text-gray-700 font-medium mb-1">Thẻ (Tags):</label>

          <div className="flex flex-wrap gap-2 mb-2">
            {tagList.map((tag) => (
              <div
                key={tag}
                className="flex items-center bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <input
            type="text"
            value={inputTag}
            onChange={(e) => {
              setInputTag(e.target.value);
              setIsDropdownVisible(true);
            }}
            onKeyDown={handleKeyDownOnTagInput}
            placeholder="Nhập thẻ và nhấn Enter hoặc chọn gợi ý"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {isDropdownVisible && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-44 overflow-y-auto shadow-lg">
              {suggestions.map((sug) => (
                <li
                  key={sug}
                  onClick={() => addTag(sug)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {sug}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Tạo Bài Viết
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
}
