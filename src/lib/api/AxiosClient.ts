import axios from "axios";
import { getToken, removeToken } from "@/lib/auth/token";
import { removeUserInfo } from "@/lib/auth/user";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để tự động thêm Bearer Token
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Xử lý lỗi 401 (Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
        removeUserInfo(); // Xóa thông tin người dùng khi token hết hạn
    }
    return Promise.reject(error);
  }
);

export default apiClient;