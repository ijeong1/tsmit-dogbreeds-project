import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';
import * as userDataService from '@/services/userDataService';

export default async function MyPage() {
    const session = await getAuthSession();
    
    if (!session?.user) {
        redirect('/login'); // Redirect to login page if not authenticated
    }

    const userProfile = await userDataService.getUserDataById(session.user.id);

    // if (!userProfile) {
    //     redirect('/profiles'); // Redirect to profiles page if no matching data
    // }
    
    return (
    <div className='bg-gray-500'>
        <h1 className="text-2xl font-bold text-center mb-6">My Page</h1>
        <p className="text-center">Welcome, {session.user.email}!</p>
        <div className="text-center mt-4">
            <h2 className="text-xl font-semibold">Profile Information</h2>
            {userProfile ? (
                <>
                    <p><strong>Name:</strong> {userProfile.name}</p>
                    <p><strong>Address:</strong> {userProfile.address}</p>
                    <p><strong>Phone Number:</strong> {userProfile.phone}</p>
                </>
            ) : (
                <p className="text-center text-red-500">Profile information is not available.</p>
            )}
        </div>        
    </div>
  )
}
