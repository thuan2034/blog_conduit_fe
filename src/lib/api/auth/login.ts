export async function login(email: string, password: string) {
    const res = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message||"Đăng nhập thất bại, lỗi không xác định");
    }
    return res.json();
}