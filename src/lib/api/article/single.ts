export async function singleArticle(slug: string) {
    const res = await fetch(`http://localhost:8080/api/articles/${slug}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Lấy thông tin bài viết thất bại, lỗi không xác định");
    }
    return res.json();
}