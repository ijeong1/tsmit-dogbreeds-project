'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { label: "Home", href: "/" },
        { label: "Breeds", href: "/breeds" },
        { label: "Favorites", href: "/favorites" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <nav className="sticky top-0 z-50 text-white bg-gradient-to-r from-gray-800 to-black shadow-md p-4 flex gap-6 items-center justify-center">
            {
            navItems.map((item) => (
                <Link key={item.label} href={item.href} className="hover:text-yellow-400 group">
                    <span
                        className={`relative ${pathname === item.href ? "font-bold underline text-blue-600" : ""} transition-all duration-300`}
                    >
                        {item.label}
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>
                    </span>
                </Link>
            ))
            }
        </nav>
    )
}