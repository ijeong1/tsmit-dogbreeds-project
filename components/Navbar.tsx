'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { label: "Home", href: "/" },
        { label: "Breeds", href: "/breeds" },
        { label: "Favorites", href: "/favorites" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6 sticky top-0 z-50">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54">
                    <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 
                             10.8 0 12.15 8.1 17.55 9.45 
                             3.6.9 6.75-.45 9.45-4.05
                             -1.8 7.2-6.3 10.8-13.5 10.8
                             -10.8 0-12.15-8.1-17.55-9.45
                             -3.6-.9-6.75.45-9.45 4.05zM0 
                             38.3c1.8-7.2 6.3-10.8 13.5-10.8 
                             10.8 0 12.15 8.1 17.55 9.45 
                             3.6.9 6.75-.45 9.45-4.05
                             -1.8 7.2-6.3 10.8-13.5 10.8
                             -10.8 0-12.15-8.1-17.55-9.45
                             -3.6-.9-6.75.45-9.45 4.05z" />
                </svg>
                <span className="font-semibold text-xl tracking-tight">Dog Breed App</span>
            </div>

            {/* Mobile Menu Toggle */}
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

            {/* Nav Links */}
            <div className={`w-full ${isOpen ? 'block' : 'hidden'} flex-grow lg:flex lg:items-center lg:w-auto`}>
                <div className="text-sm lg:flex-grow">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`block mt-4 lg:inline-block lg:mt-0 mr-4 
                                ${pathname === item.href ? "text-white font-bold underline" : "text-teal-200 hover:text-white"}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

            </div>
        </nav>
    );
}
