'use client';
import React, { useActionState } from 'react';
import { SignUpProfileResult, signUpProfileToDB } from '@/actions/signUpProfileToDB';
import SubmitButton from '@/components/SubmitButton';

export default function RegisterPage() {
const [state, formAction] = useActionState<SignUpProfileResult, FormData>(
        signUpProfileToDB,
        {
            success:false, errors: {
                global: []
            }
        }
    );

return (<div className="bg-gray-800 text-white p-5 rounded">
    <form action={formAction} className="max-w-md mx-auto">
        <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-gray-400">Name:</label>
            <input type="text" id="name" name="name" required className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-700 text-white" />
        </div>
        <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-gray-400">Email:</label>
            <input type="email" id="email" name="email" required className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-700 text-white" />
        </div>
        <div className="mb-4">
            <label htmlFor="phone" className="block mb-2 text-gray-400">Phone Number:</label>
            <input type="tel" id="phone" name="phone" required className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-700 text-white" />
        </div>
        <div className="mb-4">
            <label htmlFor="address" className="block mb-2 text-gray-400">Address:</label>
            <input type="text" id="address" name="address" required className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-700 text-white" />
        </div>
        <SubmitButton />
    </form>
    {state.errors?.global && state.errors.global.length > 0 && (
        <p className="text-red-500 text-sm mt-2">{state.errors.global[0]}</p>
    )}
    {state.success && (
        <p className="text-green-500 text-sm mt-2">Registration successful! You can now log in.</p>
    )}
</div>);
}
