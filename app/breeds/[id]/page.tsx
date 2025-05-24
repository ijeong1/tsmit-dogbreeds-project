import axios from 'axios';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type DogBreed = {
  id: string;
  name: string;
  description?: string;
  origin?: string;
  temperament?: string;
};

async function getBreedById(id: string): Promise<DogBreed | null> {
  try {
    const res = await axios.get(
      `https://nwabcijafvtjioyuexji.supabase.co/functions/v1/get-dog-breeds-by-id?id=${id}`
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch breed by ID:', error);
    return null;
  }
}

async function getBreedImage(breedName: string): Promise<string> {
  const formattedName = breedName.toLowerCase().replace(/\s+/g, '');
  try {
    const res = await axios.get(
      `https://dog.ceo/api/breed/${formattedName}/images/random`
    );
    return res.data.message;
  } catch (error) {
    console.warn(`No image found for breed: ${breedName}`);
    return '/dog-placeholder.png';
  }
}

export default async function BreedDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const breed = await getBreedById(id);
  if (!breed) return notFound();

  let imageUrl = '/dog-placeholder.png';
  try {
    imageUrl = await getBreedImage(breed.name);
  } catch {}

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col items-center">
        <Image
          src={imageUrl}
          alt={breed.name}
          width={300}
          height={300}
          className="rounded-lg object-cover mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{breed.name}</h1>
        {breed.origin && (
          <p className="text-gray-600 mb-1">
            <strong>Origin:</strong> {breed.origin}
          </p>
        )}
        {breed.temperament && (
          <p className="text-gray-600 mb-1">
            <strong>Temperament:</strong> {breed.temperament}
          </p>
        )}
        {breed.description && (
          <p className="text-gray-700 mt-4">{breed.description}</p>
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
