interface CreateProductButtonProps {
  isPending: boolean;
}

export const CreateProductButton = ({ isPending }: CreateProductButtonProps) => {
  return (
    <button
      type="submit"
      className="bg-primary text-white font-semibold disabled:opacity-50 rounded-full px-4 py-2 hover:bg-primary/90 transition-colors"
      disabled={isPending}
    >
      {isPending ? 'Creando producto...' : 'Crear producto'}
    </button>
  );
};
