// lib/auth/token.ts
const TOKEN_KEY = 'jwt_token';

export function saveToken(token: string) {
  // Only access localStorage if window is defined (i.e., on the client-side)
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function getToken(): string | null {
  // Only access localStorage if window is defined
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null; // Return null if on the server or localStorage is not available
}

export function removeToken() {
  // Only access localStorage if window is defined
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
}