'use client';

import { Share2 } from 'lucide-react';

export const ShareButton = () => {
  const handleClick = (): void => {
    console.log('Shared button feature not implemented yet');
    navigator.share?.({
      title: document.title,
      url: window.location.href,
    });
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-full hover:bg-secondary text-muted-foreground transition-colors cursor-pointer"
    >
      <Share2 className="w-5 h-5" />
    </button>
  );
};
