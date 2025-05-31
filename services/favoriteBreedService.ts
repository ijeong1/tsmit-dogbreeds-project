import { prisma } from '@/lib/prismaClient';
// import { supabase } from '@/lib/supabaseClient';
import * as DogBreedsService from "@/services/dogBreedsService";

export async function addFavoriteBreed(breedId: string, memo?: string) {
    const createFavorite = prisma.favorite_breeds.create({
            data: { breeds_id: breedId, memo: memo }
        }
    )
    return createFavorite;
}

export async function getAllFavoriteBreeds() {
  try {
    const favoriteBreeds = await prisma.favorite_breeds.findMany({
      orderBy: {
        created_at: 'asc',
      },
    });

    const allBreeds = await DogBreedsService.fetchAllDogBreeds();

    if (!Array.isArray(allBreeds)) {
      throw new Error('DogBreedsService.fetchAllDogBreeds() did not return an array');
    }

    const favoriteBreedsWithDetails = favoriteBreeds.map((favorite) => {
      const breed = allBreeds.find((b) => String(b.id) === String(favorite.breeds_id));
      return {
        ...favorite,
        name: breed?.name || 'Unknown Breed',
        description: breed?.description || 'No description available',
        life: breed?.life || { min: '?', max: '?' },
      };
    });

    return favoriteBreedsWithDetails;
  } catch (error) {
    console.error('getAllFavoriteBreeds() error:', error);
    throw new Error('Failed to get all favorite breeds');
  }
}


export async function getFavoriteByBreedId(breedId: string) {
    return prisma.favorite_breeds.findFirst({
        where: { breeds_id: breedId },
    });
}

export async function deleteFavoriteBreed(breedId: string) {
    return prisma.favorite_breeds.deleteMany({
        where: { breeds_id: breedId }
    });
}
