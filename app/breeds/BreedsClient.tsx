'use client';

import { useBreeds } from '@/contexts/BreedsContext';
import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import DogList from '@/components/DogList';

export default function BreedsClient() {
  const { breeds } = useBreeds();
  const [query, setQuery] = useState('');

  const filtered = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 mt-10">
      <SearchBar onSearch={setQuery} />
      <DogList breeds={filtered} />
    </div>
  );
}
