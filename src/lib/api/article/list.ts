import apiClient from "../AxiosClient";
export async function listArticles(limit?: number, offset?: number) {
   const response = await apiClient.get("/articles", {
      params: {
            limit: limit || 20,
            offset: offset || 0,
      }
    });
    return response.data;
}