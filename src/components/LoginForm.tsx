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
      setError(err.message||"Đăng nhập thất bại, lỗi không xác định");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <h2 className="">Đăng nhập</h2>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="Email"
        className=""
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">Mật khẩu</label>
      <input
        type="password"
        placeholder="Mật khẩu"
        className=""
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {error && <div className="">{error}</div>}
      <button type="submit" className="" disabled={loading}>
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
}