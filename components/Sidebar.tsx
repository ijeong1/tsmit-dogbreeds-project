'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    // { label: "Home", href: "/" },
    { label: "Breeds", href: "/breeds" },
    { label: "Favorites", href: "/favorites" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="flex flex-col space-y-4">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`px-3 py-2 rounded hover:bg-gray-300 transition 
            ${
              item.href === "/" ? pathname === "/"
              ? "bg-gray-400 font-bold"
              : "text-teal-200 hover:text-white"
              : pathname.startsWith(item.href)
              ? "bg-gray-400 font-bold"
              : ""
            }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
