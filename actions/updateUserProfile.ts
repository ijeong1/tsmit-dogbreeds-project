'use server';

import { prisma } from '@/lib/prismaClient'; // prisma client import
import { getAuthSession } from '@/lib/auth';

export type UpdateUserProfileResult = { success: boolean, errors: null;} | { success: false; errors: Record<string, string[]>;};
export async function updateUserProfile(prevState: UpdateUserProfileResult, formData: FormData) : Promise<UpdateUserProfileResult>
{

    const session = await getAuthSession();
    
    if (!session?.user?.email) {
        throw new Error('Not authenticated');
    }

    const raw = {
        phone: formData.get('phone')?.toString(),
        street: formData.get('street')?.toString(),
        city: formData.get('city')?.toString(),
        state: formData.get('state')?.toString(),
        zipcode: formData.get('zipcode')?.toString(),
    }

    try {
        await prisma.profiles.update({
            where: { google_id: session.user.id },
            data: {
                phone: raw.phone,
                street: raw.street,
                city: raw.city,
                state: raw.state,
                zipcode: raw.zipcode,
            }
        });

        return { success: true, errors: null};
    }
    catch (error){
        return { success: false, errors: { global: ["Failed to update. Please try again later."] } };
    }
    return {success: false, errors: null};
}