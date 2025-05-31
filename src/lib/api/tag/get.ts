import apiClient from "@/lib/api/AxiosClient";

export async function getTags() {
    const response = await apiClient.get("/tags");
    return response.data;
}
