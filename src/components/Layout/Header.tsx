// components/Layout/Header.tsx (hoặc đường dẫn tương tự của bạn)
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react"; // Thêm useEffect nếu cần xử lý client-side specific
import { useAuth } from "@/lib/auth/AuthContext"; // Import useAuth

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, user, logout } = useAuth(); // Lấy trạng thái xác thực từ context

  const commonLinkClasses = "text-gray-600 hover:text-emerald-500 transition-colors";
  const activeLinkClasses = "text-emerald-600 font-semibold"; // Làm nổi bật link active

  // Hàm để đóng menu khi một link được click (cho mobile)
  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Render các link điều hướng dựa trên trạng thái đăng nhập
  const renderNavLinks = (isMobile: boolean = false) => {
    const linkStyle = `${isMobile ? 'block py-2 px-3 rounded-md ' : 'px-3 py-2 rounded-md text-sm font-medium '} ${commonLinkClasses}`;
    const activeStyle = `${isMobile ? 'bg-emerald-50 ' : ''}${activeLinkClasses}`;
    const buttonStyle = `${isMobile ? 'block w-full text-left py-2 px-3 rounded-md ' : 'px-3 py-2 rounded-md text-sm font-medium '} ${commonLinkClasses}`;

    return (
      <>
        <Link
          href="/"
          onClick={handleLinkClick}
          className={`${linkStyle} ${pathname === "/" ? activeStyle : ""}`}
        >
          Home
        </Link>
        {token && user ? (
          // Đã đăng nhập
          <>
            <Link
              href="/editor" // Trang tạo bài viết mới
              onClick={handleLinkClick}
              className={`${linkStyle} ${pathname === "/editor" ? activeStyle : ""}`}
            >
              New Post
            </Link>
            <Link
              href="/settings" // Trang cài đặt
              onClick={handleLinkClick}
              className={`${linkStyle} ${pathname === "/settings" ? activeStyle : ""}`}
            >
              Settings
            </Link>
            <Link
              href={`/profile/${user.username}`} // Trang cá nhân của user
              onClick={handleLinkClick}
              className={`${linkStyle} ${pathname === `/profile/${user.username}` ? activeStyle : ""}`}
            >
              {user.image && (
                <img
                  src={user.image}
                  alt={user.username}
                  className="w-6 h-6 rounded-full inline-block mr-2 object-cover"
                />
              )}
              {user.username}
            </Link>
            <button
              onClick={() => {
                logout();
                handleLinkClick(); // Đóng menu sau khi logout
              }}
              className={`${buttonStyle} hover:bg-gray-50`}
            >
              Logout
            </button>
          </>
        ) : (
          // Chưa đăng nhập
          <>
            <Link
              href="/login"
              onClick={handleLinkClick}
              className={`${linkStyle} ${pathname === "/login" ? activeStyle : ""}`}
            >
              Sign in
            </Link>
            <Link
              href="/register"
              onClick={handleLinkClick}
              className={`${linkStyle} ${pathname === "/register" ? activeStyle : ""}`}
            >
              Sign up
            </Link>
          </>
        )}
      </>
    );
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            onClick={handleLinkClick}
            className="text-xl font-bold text-emerald-600 hover:text-emerald-500 transition-colors"
          >
            Blog Conduit
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex space-x-1 items-center">
          {renderNavLinks()}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {renderNavLinks(true)}
          </nav>
        </div>
      )}
    </header>
  );
}