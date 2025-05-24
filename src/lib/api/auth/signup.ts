export async function signup(email: string, userName: string, password: string) {
    const res = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, userName, password })
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Đăng ký thất bại, lỗi không xác định");
    }
    return res.json();
}