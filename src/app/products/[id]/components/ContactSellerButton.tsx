'use client';

export const ContactSellerButton = () => {
  const handleClick = () => {
    console.log('Feature not implemented yet.');
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleClick}
        className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-lg py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98]"
      >
        Contactar al vendedor
      </button>
      <p className="text-xs text-center text-muted-foreground">
        Al contactar aceptas nuestras condiciones de uso y privacidad.
      </p>
    </div>
  );
};
