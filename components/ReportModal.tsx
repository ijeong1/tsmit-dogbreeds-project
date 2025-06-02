'use client';

import React, { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { ActionResult, sendReportAction } from '@/actions/report-issue'; // Server Action import

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
        pending ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={pending}
    >
      {pending ? 'Sending...' : 'Submit Report'}
    </button>
  );
}

export default function ReportModal({ onClose }: { onClose: () => void }) {
    const [state, formAction] = useActionState<ActionResult, FormData>(
            sendReportAction,
            {
                success:false, errors: {}
            }
        );

        return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
                <button
                onClick={() => onClose()}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-gray-600 mb-6 text-center">Report an Issue</h2>

        <form action={formAction}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
              Content:
            </label>
            <textarea
              id="content"
              name="content"
              rows={5}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  );

}