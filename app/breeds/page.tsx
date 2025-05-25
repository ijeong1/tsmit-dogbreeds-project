import { BreedsProvider } from '@/contexts/BreedsContext';
import BreedsClient from './BreedsClient';
import axios from 'axios';
import { DogBreed } from '@/types/DogBreed';
import { Suspense } from 'react';
import Loading from './loading';

async function getBreeds(): Promise<DogBreed[]> {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/breeds`);
  return res.data;
}

export default async function BreedsPage() {
  const breeds = await getBreeds();

  return (
    <BreedsProvider breeds={breeds}>
      <Suspense fallback={<Loading />}>
        <BreedsClient />
      </Suspense>
    </BreedsProvider>
  );
}