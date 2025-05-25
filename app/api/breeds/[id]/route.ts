import { NextRequest, NextResponse } from 'next/server';
import * as DogBreedsService from '@/services/dogBreedsService';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
    const breed = await DogBreedsService.fetchDogBreedById(id);
    if (!breed) {
      return NextResponse.json({ error: 'Dog Breed Not Found' }, { status: 404 });
    }
    return NextResponse.json(breed);
    } catch (error) {
        console.error('Error fetching dog breed by ID:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}