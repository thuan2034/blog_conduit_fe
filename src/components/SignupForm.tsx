import { useState } from "react";
import { signup } from "@/lib/api/auth/signup";
import { useRouter } from "next/navigation";
export default function SignupForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await signup(email, userName, password);
            setError("Đăng ký thành công!, đang chuyển đến trang login...");
            setTimeout(() => {
                setError("");
                router.push("/login");
            }, 3000);
           
        } catch (err: any) {
            setError(err.message || "Đăng ký thất bại, lỗi không xác định");
        } finally {
            setLoading(false);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Đăng ký</h2>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <label htmlFor="password">Mật khẩu</label>
            <input type="password" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} required />
            <label htmlFor="userName">Tên người dùng</label>
            <input type="text" placeholder="Tên người dùng" value={userName} onChange={e => setUserName(e.target.value)} required />
            {error && <div>{error}</div>}
            <button type="submit" disabled={loading}>{loading ? "Đang đăng ký..." : "Đăng ký"}</button>
        </form>
    )
}