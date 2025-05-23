"use client";
import { useState } from "react";
import { login } from "@/lib/api/auth/login";
import { saveToken } from "@/lib/auth/token";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await login(email, password);
      saveToken(res.data.token);
      alert("Đăng nhập thành công!");
      // Có thể redirect hoặc reload lại trang
    } catch (err: any) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Đăng nhập</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-2 p-2 border rounded"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        className="w-full mb-2 p-2 border rounded"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button type="submit" className="w-full bg-emerald-600 text-white p-2 rounded" disabled={loading}>
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
}