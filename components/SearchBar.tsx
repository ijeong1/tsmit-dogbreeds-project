'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [input, setInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    onSearch(value);
  };

  return (
    <div className="flex items-center border rounded-2xl shadow-sm px-4 py-2 bg-white w-full">
      <Search className="w-5 h-5 text-gray-400 mr-2" />
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search dog breeds..."
        className="w-full outline-none text-sm text-gray-700 bg-transparent"
      />
    </div>
  );
}
