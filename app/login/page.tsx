'use client';

import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const { data: session } = useSession();
    
    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError('');
        
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });
        if (result?.ok){
            router.push('/my-page'); // Redirect to the user's page after successful login
        }
        else {
            setError(result?.error || 'Login failed. Please check your credentials.');
            // Redirect to the home page or any other page after successful login
            window.location.href = '/';
        }

    };

    useEffect(() => {
        if (session) 
            router.push("/my-page");
    }, [session])

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="mt-1 block w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                <input
                    type="password" 
                    id="password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="mt-1 block w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <button 
                type="submit" 
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Login
            </button>
            <div>
                <button
                    type="button"
                    onClick={() => signIn('google')}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Sign in with Google
                </button>
            </div>
            <div>
                <button
                    type="button"
                    onClick={() => signIn('github')}
                    className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    Sign in with GitHub
                </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="text-center mt-4 space-y-2">
                <p className="text-sm text-gray-600">Don't have an account? <Link href="/register" className="text-indigo-600 hover:underline">Register here</Link></p>
                <p className="text-sm"><Link href="/forgot-password" className="text-indigo-600 hover:underline">Forgot Password?</Link></p>
                <p className="text-sm"><Link href="/" className="text-indigo-600 hover:underline">Back to Home</Link></p>
            </div>
        </form>
    </div>
  )
}
