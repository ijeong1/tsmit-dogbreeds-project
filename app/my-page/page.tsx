import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import * as userDataService from '@/services/userDataService';
import ClientWrapper from "@/components/ClientWrapper";
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

export default async function MyPage() {
    const session = await getAuthSession();
    const userData = await getUserData(session?.user.id!);
    
    if (!session?.user) {
        redirect('/login'); // Redirect to login page if not authenticated
    }

    return (
        <ClientWrapper session={session} userDataParam={userData}/>
  )
}
