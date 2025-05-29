import { NextRequest, NextResponse } from "next/server";
import * as FavoriteBreedService from "@/services/favoriteBreedService";

export async function POST(req: NextRequest) {
    try {
        const {breedId, memo} = await req.json();

        if (!breedId) {
            return NextResponse.json({ 
                error: 'Breed ID is required' ,
                message: 'Please provide a valid breed ID to add to favorites.'
            }, { status: 400 });
        }

        const newFavorite = await FavoriteBreedService.addFavoriteBreed(breedId, memo);
        return NextResponse.json(
            JSON.parse(
                JSON.stringify(newFavorite, (_, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            ),
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding favorite breed:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
  try {
    const favoriteBreeds = await FavoriteBreedService.getAllFavoriteBreeds();
    
    // Safely stringify BigInt
    const serialized = JSON.parse(
      JSON.stringify(favoriteBreeds, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      )
    );

    return NextResponse.json(serialized);
  } catch (error: any) {
    console.error("🔥 Error fetching favorite breeds:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}