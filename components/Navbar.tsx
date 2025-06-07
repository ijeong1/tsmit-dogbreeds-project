'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, ReactNode } from 'react';

type NavbarProps = {
    children?: ReactNode;
};

export default function Navbar({ children }: NavbarProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { label: "Home", href: "/" },
        { label: "Breeds", href: "/breeds" },
        { label: "Favorites", href: "/favorites" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6 sticky top-0 z-50">
            {/* Left side: Logo + Nav */}
            <div className="flex items-center space-x-6">
                {/* Logo */}
                <div className="flex items-center flex-shrink-0 text-white mr-2">
                    <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54">
                        <path d="..." />
                    </svg>
                    <span className="font-semibold text-xl tracking-tight">Dog Breed App</span>
                </div>

                {/* Nav links */}
                <div className="hidden lg:flex space-x-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`text-sm ${
                                item.href === "/"
                                    ? pathname === "/"
                                        ? "text-white font-bold underline"
                                        : "text-teal-200 hover:text-white"
                                    : pathname?.startsWith(item.href)
                                        ? "text-white font-bold underline"
                                        : "text-teal-200 hover:text-white"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Right side: children (ex. AuthButton) */}
            <div className="hidden lg:block">
                {children}
            </div>

            {/* Mobile menu toggle */}
            <div className="block lg:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                >
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>

            {/* Mobile Nav Menu */}
            {isOpen && (
                <div className="w-full block lg:hidden mt-4">
                    <div className="text-sm">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`block mt-2 ${
                                    item.href === "/"
                                        ? pathname === "/"
                                            ? "text-white font-bold underline"
                                            : "text-teal-200 hover:text-white"
                                        : pathname?.startsWith(item.href)
                                            ? "text-white font-bold underline"
                                            : "text-teal-200 hover:text-white"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="mt-4">{children}</div>
                    </div>
                </div>
            )}
        </nav>
    );
}
