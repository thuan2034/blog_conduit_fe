import apiClient from "../AxiosClient";

export async function getFeed(limit: number, offset: number) {
  try {
    const response = await apiClient.get("/articles/feed", {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching feed:", error);
    throw error;
  }
}