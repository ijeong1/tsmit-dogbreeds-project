'use client'
 
import { useState } from 'react';

export default function SubmitButton() {
    const [pending, setPending] = useState(false);

    return (
    <button
    type="submit"
    disabled={pending}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
        {pending ? 'Sending...' : 'Submit'}
    </button>);
}