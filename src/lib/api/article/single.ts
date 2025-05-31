import apiClient from "../AxiosClient";
export async function singleArticle(slug: string) {
    const response = await apiClient.get(`/articles/${slug}`);
    return response.data;
}