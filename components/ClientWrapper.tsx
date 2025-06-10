'use client';

import { useState, useEffect } from 'react';
import UpdateProfileModal from '@/components/UpdateProfileModal';
import { useRouter } from 'next/navigation';
import * as userDataService from '@/services/userDataService';
import axios from 'axios';

async function getUserData(sessionid: string): Promise<any> {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user?sessionId=${sessionid}`);
    return res.data;
  } catch (error: any) {
    console.error("getUserData() error:", error?.message);
    throw error;
  }
} 

export default function ClientWrapper({
  session,
  userDataParam,
}: {
  session: any;
  userDataParam: any;
}) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState(userDataParam);
  
  useEffect(() => {
    if (!modalOpen) {
      fetchUserData();
    }
  }, [modalOpen]);

  async function fetchUserData() {
    try {
      const freshData = await getUserData(session?.user.id);
      setUserData(freshData);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }

  return (
    <div className="bg-gray-500 p-4 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">My Page</h1>
      <p className="text-center">Welcome, {session.user.email}!</p>

      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <p><strong>Name:</strong> {session.user.name}</p>
        <p><strong>Phone:</strong> {userData.phone}</p>
        <p><strong>Street:</strong> {userData.street}</p>
        <p><strong>City:</strong> {userData.city}</p>
        <p><strong>State:</strong> {userData.state}</p>
        <p><strong>Zip Code:</strong> {userData.zipcode}</p>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Information
        </button>
      </div>

      {modalOpen && (
        <UpdateProfileModal
          onClose={() => {
            setModalOpen(false);
            router.refresh();
          }}
          session={session}
        />
      )}
    </div>
  );
}