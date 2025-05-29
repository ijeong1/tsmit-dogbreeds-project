'use client';

import { useState } from 'react';
import FavoriteCard from './FavoriteCard';

export default function FavoriteList({ initialFavorites }: { initialFavorites: any[] }) {
  const [favorites, setFavorites] = useState(initialFavorites);

  const handleDelete = (breeds_id: string) => {
    setFavorites((prev) => prev.filter((f) => f.breeds_id !== breeds_id));
  };

  if (favorites.length === 0) {
    return (
    <div className="h-screen flex tems-center">
      <h1 className="text-2xl font-bold text-gray-700">No Favorites Found</h1>
    </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        Favorite Dog Breeds
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((breed) => (
          <FavoriteCard
            key={breed.id}
            id={breed.id}
            name={breed.name}
            description={breed.description}
            memo={breed.memo}
            imageUrl={breed.imageUrl}
            breeds_id={breed.breeds_id}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
