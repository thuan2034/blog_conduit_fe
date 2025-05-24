export async function listArticles(limit?: number, offset?: number) {
    const res = await fetch(`http://localhost:8080/api/articles?limit=${limit}&offset=${offset}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Lấy danh sách bài viết thất bại, lỗi không xác định");
    }
    return res.json();
}