export async function getTags() {
    const res = await fetch(`http://localhost:8080/api/tags`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Lấy thông tin thẻ thất bại, lỗi không xác định");
    }
    return res.json();
}