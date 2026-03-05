'use client';

import { Button } from '@/components/ui/Button';
import { Heart } from 'lucide-react';

export const FavoriteButton = () => {
  const handleClick = () => {
    console.log('Favorite button feature not implemented yet');
  };
  return (
    <Button
      onClick={handleClick}
      className="p-2 hover:bg-secondary text-muted-foreground hover:text-red-500"
    >
      <Heart className="w-5 h-5" />
    </Button>
  );
};
