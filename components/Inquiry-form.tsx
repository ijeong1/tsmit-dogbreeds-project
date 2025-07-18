'use client';

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { submitInquiry, type ActionResult } from "@/actions/submit-inquiry";
import SubmitButton from "./SubmitButton";

export default function InquiryForm() {
    const [state, formAction] = useActionState<ActionResult, FormData>(
        submitInquiry,
        {
            success:false, errors: {}
        }
    );

    return (
    <form action={formAction} className="space-y-8 max-w-xl mx-auto bg-gray-500 p-6 rounded-xl text-xl">
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" className="block w-full border-2 border-black p-2 rounded-lg mt-1 text-gray-700" />
                {state.errors?.name && (
                    <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
                )}
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className="block w-full border-2 border-black p-2 rounded-lg mt-1 text-gray-700" />
                {state.errors?.email && (
                    <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
                )}
            </div>

            <div>
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" type="text" className="block w-full border-2 border-black p-2 rounded-lg mt-1 text-gray-700" />
                {state.errors?.subject && (
                    <p className="text-red-500 text-sm">{state.errors.subject[0]}</p>
                )}
            </div>

            <div>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={4} className="block w-full border-2 border-black p-2 rounded-lg mt-1 text-gray-700" />
                {state.errors?.message && (
                    <p className="text-red-500 text-sm">{state.errors.message[0]}</p>
                )}
            </div>

            <SubmitButton />

            {state.success && (
                <p className="text-green-600 text-sm mt-2">Your inquiry was successfully summitted.</p>
            )}
        </form>
     );
}