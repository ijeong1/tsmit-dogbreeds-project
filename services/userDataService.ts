import { prisma } from "@/lib/prismaClient";

interface UserData {
    phone: string | null;
    street: string | null;
    city: string | null;
    state: string | null;
    zipcode: string | null;
}

export async function getUserDataById(userId: string): Promise<UserData | null> {
    try {
        const profile = await prisma.profiles.findUnique({
            where: { google_id: userId },
        });
        return profile ? { 
            phone: profile.phone, 
            street: profile.street, 
            city: profile.city, 
            state: profile.state, 
            zipcode: profile.zipcode 
        } : null;
    } catch (error) {
        console.error('Error retrieving user data:', error);
        throw new Error('Failed to retrieve user data');
    }
}