'use client';

import React, { useActionState, useEffect } from 'react';
import { updateUserProfile } from '@/actions/updateUserProfile';
import { UpdateUserProfileResult } from '@/actions/updateUserProfile';
import { useFormStatus } from 'react-dom';

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
      {pending ? 'Updating...' : 'Update'}
    </button>
  );
}

export default function UpdateProfileModal({
  onClose,
  session,
}: {
  onClose: () => void;
  session: any;
}) {
  const [state, formAction] = useActionState<UpdateUserProfileResult, FormData>(
    updateUserProfile,
    {
      success: false,
      errors: {
        global: [],
      },
    }
  );

  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [state.success, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">Update Profile</h2>

        <form action={formAction} className="space-y-4">
          <input
            name="phone"
            placeholder="Phone"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="street"
            placeholder="Street"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="city"
            placeholder="City"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="state"
            placeholder="State"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="zipcode"
            placeholder="Zip Code"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <SubmitButton />
          </div>
          
          {state.errors?._form && (
            <div className="mt-4 text-red-400 text-sm">
              {state.errors._form.map((msg, i) => <p key={i}>{msg}</p>)}
              </div>)}
        </form>
      </div>
    </div>
  );
}
