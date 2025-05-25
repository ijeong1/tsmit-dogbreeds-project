import { NextResponse } from 'next/server';
import * as DogBreedsService from '@/services/dogBreedsService';

export async function GET() {
    try {
        const dogBreeds = await DogBreedsService.fetchAllDogBreeds();
        return NextResponse.json(dogBreeds);
    } catch (error) {
        console.error('Error fetching dog breeds:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name');
        const description = searchParams.get('description');
        const life = searchParams.get('life');
        if (!name || !description || !life) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        return NextResponse.json({ message: 'Breed created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating dog breed:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
