"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from 'react';

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
            {/* Logo */}
            <div className="flex items-center">
                <Link href="/" className="text-xl font-bold text-emerald-600 hover:text-emerald-500 transition-colors">
                    Blog Conduit
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden p-2 text-gray-600 hover:text-gray-800"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                ☰
            </button>

            {/* Navigation Links - Desktop */}
            <nav className="hidden md:flex space-x-6">
                <Link
                    href="/"
                    className={`text-gray-600 hover:text-emerald-500 transition-colors ${pathname === '/' ? 'text-emerald-600' : ''}`}
                >
                    Home
                </Link>
                <Link
                    href="/login"
                    className={`text-gray-600 hover:text-emerald-500 transition-colors ${pathname === '/login' ? 'text-emerald-600' : ''}`}
                >
                    Sign in
                </Link>
                <Link
                    href="/register"
                    className={`text-gray-600 hover:text-emerald-500 transition-colors ${pathname === '/register' ? 'text-emerald-600' : ''}`}
                >
                    Sign up
                </Link>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md p-4">
                    <Link
                        href="/login"
                        className={`block py-2 text-gray-600 hover:text-emerald-500 transition-colors ${pathname === '/login' ? 'text-emerald-600' : ''}`}
                    >
                        Sign in
                    </Link>
                    <Link
                        href="/register"
                        className={`block py-2 text-gray-600 hover:text-emerald-500 transition-colors ${pathname === '/register' ? 'text-emerald-600' : ''}`}
                    >
                        Sign up
                    </Link>
                </div>
            )}

            {/* Auth Buttons */}
            <div className="hidden md:flex space-x-4">
                <Link
                    href="/login"
                    className="px-4 py-2 text-gray-600 hover:text-emerald-500 transition-colors"
                >
                    Sign in
                </Link>
                <Link
                    href="/register"
                    className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
                >
                    Sign up
                </Link>
            </div>
        </header>
    );
}