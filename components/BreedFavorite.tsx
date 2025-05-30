'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import axios from 'axios';

export default function BreedFavorite({
    breedId,
    isFavorite = false,
}: {
    breedId: string;
    isFavorite?: boolean;
}) {
    const router = useRouter();
    const [memo, setMemo] = useState('');
    const [showMemo, setShowMemo] = useState(false);
    const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsFavoriteState(isFavorite);
    }, [isFavorite]);

    const handleToggleFavorite = async () => {
        try {
            setIsLoading(true);
            if (isFavoriteState) {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/favorite-breeds/${breedId}`);
            } else {
                if (!isLoading) {
                    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/favorite-breeds`, {
                        breedId,
                        memo: memo.trim(),
                    });
                }
            }

            setIsFavoriteState(!isFavoriteState);
            setMemo('');
        } catch (error) {
            console.error('Error toggling favorite:', error);
        } finally {
            setIsLoading(false);
            setShowMemo(false);
        }
    };

    return (
        <div className="absolute top-2 right-0 z-10 flex flex-col items-end space-y-2">
            <button
                onClick={() => {
                    if (isFavoriteState) {
                        handleToggleFavorite();
                    } else {
                        setShowMemo(true);
                    }
                }}
                className={`text-pink-500 bg-white rounded-full p-1 shadow hover:scale-110 transition ${
                    isLoading ? 'opacity-50 pointer-events-none' : ''
                }`}
                aria-label="Favorite Toggle"
            >
                {isFavoriteState ? <Heart fill="currentColor" /> : <Heart />}
            </button>

            {showMemo && !isFavoriteState && (
                <textarea
                    className="w-64 p-2 text-sm border border-gray-300 text-gray-800 rounded"
                    rows={3}
                    placeholder="Add a note about this breed..."
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleToggleFavorite();
                        }
                    }}
                />
            )}
        </div>
    );
}
