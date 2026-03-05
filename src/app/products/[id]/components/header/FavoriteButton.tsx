'use client';

import { Heart } from 'lucide-react';

export const FavoriteButton = () => {
  const handleClick = () => {
    console.log('Favorite button feature not implemented yet');
  };
  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-red-500 transition-colors cursor-pointer"
    >
      <Heart className="w-5 h-5" />
    </button>
  );
};
