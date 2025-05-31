import apiClient from "../AxiosClient";

export async function createArticle(article: {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
}) {
    const response = await apiClient.post("/articles", article);
    return response.data;
}