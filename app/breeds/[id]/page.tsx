import axios from 'axios';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { DogBreed, DogBreedsById } from '@/types/DogBreed';
import BreedFavorite from '@/components/BreedFavorite';

async function getBreedById(id: string): Promise<DogBreedsById | null> {
    try {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/breeds/${id}`
    );

    return res.data;
    } catch (error) {
    console.error('Failed to fetch breed by ID:', error);
    return null;
  }
}

export default async function BreedDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const breed = await getBreedById(id);
  if (!breed) return notFound();

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <div className="relative mb-6">
            <BreedFavorite breedId={breed.id} isFavorite={breed.isFavorite} />
        </div>
        <div className="flex flex-col items-center">
            <Image
                src={breed.attributes.imageUrl || '/placeholder.png'}
                alt={breed.attributes.name}
                width={300}
                height={300}
                className="rounded-lg object-cover mb-4"
            />
            <h1 className="text-3xl font-bold mb-2">
                <p className="text-gray-700">{breed.attributes.name}</p>
            </h1>
            {breed.attributes.description && (
                <p className="text-gray-700 mt-4">{breed.attributes.description}</p>
            )}
            {breed.attributes.life && (
                <p className="text-gray-500 mt-2">
                    Life Expectancy: {breed.attributes.life.min} ~ {breed.attributes.life.max}
                </p>
            )}
        </div>
        <div className="mt-6">
            <a href="/breeds" className="text-blue-500 hover:underline text-sm">
                ← Back to Breeds List
            </a>
        </div>
    </div>
  );
}
