'use client';

import { X } from 'lucide-react';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';

interface FavoriteCardProps {
  id: string;
  name: string;
  description: string;
  memo: string;
  imageUrl?: string;
  breeds_id: string;
  onDelete: (breeds_id: string) => void;
}

export default function FavoriteCard({
  id,
  name,
  description,
  memo,
  imageUrl,
  breeds_id,
  onDelete,
}: FavoriteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    try {
      setIsDeleting(true);
      const result = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/favorite-breeds/${breeds_id}`);
      onDelete(breeds_id);
    } catch (err) {
    console.error('Failed to delete:', err);
    alert('Failed to delete.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Delete button */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="absolute top-2 right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 transition"
        title="Delete"
      >
        <X size={18} />
      </button>

      {imageUrl && (
        <Image
          src={imageUrl}
          alt={name}
          width={400}
          height={300}
          className="object-cover w-full h-48"
        />
      )}

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        {memo && (
          <div className="p-4 bg-blue-100 text-blue-800 rounded-lg shadow">
            <p className="font-bold break-words whitespace-pre-line">{memo}</p>
          </div>
        )}
      </div>
    </div>
  );
}
