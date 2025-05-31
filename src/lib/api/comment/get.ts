import apiClient from "../AxiosClient";
export async function getComments(slug: string) {
    const response = await apiClient.get(`/articles/${slug}/comments`);
    return response.data;
}