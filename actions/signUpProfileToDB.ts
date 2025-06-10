"use server";

import { prisma } from "@/lib/prismaClient";

export type SignUpProfileResult = { success: boolean, errors: null | { global: string[] } };
export async function signUpProfileToDB (prevState: SignUpProfileResult, formData: FormData): Promise<SignUpProfileResult> 
{
    // const raw = {
    //     name: formData.get('name')?.toString(),
    //     email: formData.get('email')?.toString(),
    //     password: formData.get('password')?.toString(),
    //     phoneNumber: formData.get('phone')?.toString(),
    //     // address: formData.get('address')?.toString(),
    // };

    // try {
    //     await prisma.profiles.create({
    //         data: {
    //             name: raw.name,
    //             //password: raw.password, // Ensure to hash the password in a real application
    //             phone: raw.phoneNumber,
    //             //address: raw.address,
    //             users: {
    //                 connect: { id: formData.get('userId')?.toString() } // Ensure 'userId' exists in formData
    //             }
    //         }
    //     });
    //     return { success: true, errors: null };
    // } catch (error) {
    //     console.error("Error signing up profile:", error);
    //     return { success: false, errors: { global: ["Failed to sign up. Please try again later."] } };
    // }
    return {success: false, errors: null};
}