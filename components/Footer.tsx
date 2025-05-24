export default function Footer() {
    return (
        <footer className="w-full bg-teal-500 text-white py-6"
        >
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Dog Breeds. All rights reserved.
                    We are The Sent MIT Team, a group of passionate developers
                    dedicated to creating amazing web experiences.
                </p>
                <p className="text-xs mt-2">
                    Built with ❤️ using Next.js and Tailwind CSS.
                </p>
            </div>
        </footer>
    )
}