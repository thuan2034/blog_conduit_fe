"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getToken, removeToken, saveToken } from "@/lib/auth/token";
// Giả sử bạn tạo file user.ts và User type
import { saveUserInfo, getUserInfo, removeUserInfo } from "@/lib/auth/user";
import type { User } from "@/lib/auth/user"; 

interface AuthContextType {
  token: string | null;
  user: User | null; // Thêm trạng thái người dùng
  setAuthData: (token: string, userData: User) => void; // Hàm để set cả token và user
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null); // Khởi tạo là null
  const [user, setUserState] = useState<User | null>(null);   // Khởi tạo là null

  // Đồng bộ token và user từ localStorage khi component mount (chỉ chạy ở client)
  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getUserInfo();
    if (storedToken) {
      setTokenState(storedToken);
    }
    if (storedUser) {
      setUserState(storedUser);
    }
  }, []);

  const setAuthData = (newToken: string, newUser: User) => {
    saveToken(newToken);
    saveUserInfo(newUser);
    setTokenState(newToken);
    setUserState(newUser);
  };

  const logout = () => {
    removeToken();
    removeUserInfo(); // Xóa thông tin người dùng khi logout
    setTokenState(null);
    setUserState(null); // Xóa trạng thái người dùng
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ token, user, setAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}