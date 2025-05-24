'use client';

import { DogBreed } from '@/types/DogBreed';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function DogList({ breeds }: { breeds: DogBreed[] }) {
  const [visibleCount, setVisibleCount] = useState(20);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 20, breeds.length));
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect();
    };
  }, [breeds.length]);

  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {breeds.slice(0, visibleCount).map((breed) => (
        <Link href={`/breeds/${breed.id}`} key={breed.id}>
        <div className="bg-white p-4 rounded-2xl shadow-md border hover:shadow-lg transition-all cursor-pointer transform hover:scale-105 hover:border-blue-500">
          <h2 className="text-lg font-semibold mb-2 text-blue-600">{breed.name}</h2>
          {breed.description && (
            <p className="text-gray-600 text-sm">{breed.description}</p>
          )}
        </div>
        </Link>
      ))}
    </div>
      {/* Trigger loading */}
      {visibleCount < breeds.length && (
        <div
          ref={loaderRef}
          className="h-10 flex justify-center items-center text-gray-400 text-sm"
        >
          Loading more...
        </div>
      )}
    </>
  );
}