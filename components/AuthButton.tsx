'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AuthButton() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return <div>Loading...</div>; // Show loading state while session is being fetched
    }

    if (!session) {
        return (
            <button
                onClick={() => router.push('/login')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Sign In
                </button>
            );
        } else {
            return (
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Sign Out
                </button>
            );
        }
}