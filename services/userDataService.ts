import { prisma } from "@/lib/prismaClient";

interface UserData {
    name: string;
    phone: string;
    address: string;
}

export async function getUserDataById(userId: string): Promise<UserData | null> {
    try {
        const user = await prisma.profiles.findUnique({
            where: { id: userId },
            select: {
                name: true,
                phone: true,
                address: true,
            },
        });

        if (!user) {
            return null;
        }

        return {
            name: user.name!,
            phone: user.phone!,
            address: user.address!,
        };
    } catch (error) {
        console.error('Error retrieving user data:', error);
        throw new Error('Failed to retrieve user data');
    }
}