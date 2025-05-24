'use client';
import { DogBreed } from '@/types/DogBreed';
import React, { createContext, useContext } from 'react'

const BreedsContext = createContext<{ breeds: DogBreed[] }>({ breeds: [] });

export function BreedsProvider({
  breeds,
  children,
}: {
  breeds: DogBreed[];
  children: React.ReactNode;
}) {
  return (
    <BreedsContext.Provider value={{ breeds }}>
      {children}
    </BreedsContext.Provider>
  );
}

// Hook
export function useBreeds() {
  return useContext(BreedsContext);
}
