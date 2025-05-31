import apiClient from "@/lib/api/AxiosClient";

export async function login(email: string, password: string) {
  const response = await apiClient.post("/users/login", { email, password });
  return response.data;
}