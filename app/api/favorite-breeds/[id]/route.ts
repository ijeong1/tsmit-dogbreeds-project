import { NextRequest, NextResponse } from "next/server";
import * as FavoriteBreedService from "@/services/favoriteBreedService";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
    const favorite = await FavoriteBreedService.getFavoriteByBreedId(id);
    if (!favorite) {
      return NextResponse.json({ error: 'Dog Favorite infomation Not Found' }, { status: 404 });
    }
    return NextResponse.json(
      JSON.parse(JSON.stringify(favorite, (_, value) => (typeof value === 'bigint' ? value.toString() : value)))
    );
    } catch (error) {
        console.error('Error fetching favorite dog breed by ID:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const deleted = await FavoriteBreedService.deleteFavoriteBreed(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Dog Favorite infomation Not Found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Favorite breed deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting favorite dog breed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}