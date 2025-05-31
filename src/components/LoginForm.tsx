// components/LoginForm.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth/login"; // API login của bạn
import { useAuth } from "@/lib/auth/AuthContext";
import type { User } from "@/lib/auth/user"; // Import User type

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setAuthData } = useAuth(); // Lấy hàm setAuthData từ context

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Giả sử hàm login trả về toàn bộ object từ server:
      // { status: "OK", message: "Login successful", data: { token: "...", email: "...", ... } }
      const response = await login(email, password);

      if (response?.status !== "OK" || !response?.data?.token) {
        throw new Error(response?.message || "Đăng nhập thất bại: Phản hồi không hợp lệ");
      }

      // response.data chứa { token, email, username, bio, image }
      const { token, ...userDetails } = response.data;
      
      const userToStore: User = {
          email: userDetails.email,
          username: userDetails.username,
          bio: userDetails.bio,
          image: userDetails.image,
          // Đảm bảo tất cả các trường trong User interface đều được cung cấp
      };

      setAuthData(token, userToStore); // Lưu token và thông tin người dùng
      router.push("/#"); // Chuyển hướng đến trang home sau khi đăng nhập thành công
    } catch (err: any) {
      setError(err.message || "Đăng nhập thất bại, lỗi không xác định");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Đăng nhập</h2>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="Email"
        className="border rounded p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">Mật khẩu</label>
      <input
        type="password"
        placeholder="Mật khẩu"
        className="border rounded p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        className="bg-blue-500 text-white rounded p-2 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
}