'use client';

import { Button } from '@/components/ui/Button';
import { incrementProductLikesAction } from '@/features/product/actions';
import { Heart } from 'lucide-react';
import { useOptimistic, useTransition } from 'react';

interface LikeButtonProps {
  initialLikes: number;
  productId: number;
}

export const FavoriteButton = ({ initialLikes, productId }: LikeButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const [likes, addLike] = useOptimistic(
    initialLikes,
    (state, incrementBy: number) => state + incrementBy,
  );

  const handleClick = () => {
    startTransition(async () => {
      addLike(1);

      try {
        await incrementProductLikesAction(productId);
      } catch {
        console.error(`[Error increasing likes] -- ID: ${productId}`);
      }
    });
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isPending}
      className="p-2 hover:bg-secondary text-muted-foreground hover:text-red-500"
    >
      <Heart className="w-5 h-5" /> {likes}
    </Button>
  );
};
