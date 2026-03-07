'use client';

import { Button } from '@/components/ui/Button';

export const ContactSellerButton = () => {
  const handleClick = () => {
    console.log('Feature not implemented yet.');
  };

  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={handleClick}
        className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-lg py-3.5 rounded-lg shadow-md transition-all"
      >
        Contactar al vendedor *
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        * Al contactar aceptas nuestras condiciones de uso y privacidad.
      </p>
    </div>
  );
};
