import FavoriteList from '@/components/FavoriteList';
import axios from 'axios';

async function getFavorites(): Promise<any[]> {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/favorite-breeds`);
    return res.data;
  } catch (error: any) {
    console.error("getFavorites() error:", error?.response?.data || error.message);
    throw error;
  }
}

export default async function FavoritesPage() {
  const favorites = await getFavorites();
  return <FavoriteList initialFavorites={favorites} />;
}