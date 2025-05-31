// lib/auth/user.ts
export interface User {
  email: string;
  username: string;
  bio: string;
  image: string;
}
const USER_INFO_KEY = 'user_info';

export function saveUserInfo(userInfo: User) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  }
}

export function getUserInfo(): User | null {
  if (typeof window !== 'undefined') {
    const userInfoStr = localStorage.getItem(USER_INFO_KEY);
    if (userInfoStr) {
      try {
        return JSON.parse(userInfoStr) as User;
      } catch (error) {
        console.error("Error parsing user info from localStorage:", error);
        localStorage.removeItem(USER_INFO_KEY); // Xóa dữ liệu bị hỏng
        return null;
      }
    }
  }
  return null;
}

export function removeUserInfo() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_INFO_KEY);
  }
}