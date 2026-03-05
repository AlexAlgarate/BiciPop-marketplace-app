'use client';

import { useActionState, useEffect, useState } from 'react';
import { createAdAction } from '../create/actions';
import { ProductFormState } from '../types';
import Image from 'next/image';

type Category = { id: number; name: string };

interface CreateAdFormProps {
  categories: Category[];
}

const initialState: ProductFormState = {
  success: false,
  message: '',
  requestId: 0,
};

export const CreateAdForm = ({ categories }: CreateAdFormProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [state, formAction, isPending] = useActionState(createAdAction, initialState);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setPreview(null);
      return;
    }

    const NextUrl = URL.createObjectURL(file);
    setPreview(NextUrl);
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 border border-border rounded-xl p-4"
    >
      {state.errors?.general && (
        <p className="text-red-500 text-sm">{state.errors.general}</p>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium">
          Título
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Ej: Bicicleta de montaña"
          className="border border-border rounded-lg px-3 py-2 text-sm"
        />
        {state.errors?.title && (
          <p className="text-red-500 text-xs">{state.errors.title}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          placeholder="Describe tu anuncio..."
          className="border border-border rounded-lg px-3 py-2 text-sm resize-none"
        />
        {state.errors?.description && (
          <p className="text-red-500 text-xs">{state.errors.description}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="price" className="text-sm font-medium">
          Precio (€)
        </label>
        <input
          id="price"
          name="price"
          type="number"
          min={0}
          placeholder="0"
          className="border border-border rounded-lg px-3 py-2 text-sm"
        />
        {state.errors?.price && (
          <p className="text-red-500 text-xs">{state.errors.price}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="categoryId" className="text-sm font-medium text-foreground">
          ¿Qué tipo de bici es?
        </label>

        <div className="relative">
          <select
            id="categoryId"
            name="categoryId"
            className="w-full appearance-none border border-border rounded-lg px-4 py-2.5 text-sm bg-card text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled hidden>
              Selecciona el estilo (ej: Carretera, MTB...)
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        {state.errors?.categoryId && (
          <p className="text-red-500 text-xs font-medium mt-1">
            {state.errors.categoryId}
          </p>
        )}

        <p className="text-xs text-muted-foreground">
          {'* Si es una E-bike de montaña, te sugerimos la categoría "Montaña"'}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="location" className="text-sm font-medium">
          Ubicación
        </label>
        <input
          id="location"
          name="location"
          type="text"
          placeholder="Ej: Madrid"
          className="border border-border rounded-lg px-3 py-2 text-sm"
        />
        {state.errors?.location && (
          <p className="text-red-500 text-xs">{state.errors.location}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="imageUrl" className="text-sm font-medium">
          URL de imagen
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="file"
          placeholder="Sube una fotografía de tu bici.."
          accept="image/*"
          onChange={handleFileChange}
          className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
        />
        {state.errors?.imageUrl && (
          <p className="text-red-500 text-xs">{state.errors.imageUrl}</p>
        )}
      </div>
      {preview && (
        <Image
          src={preview}
          alt="Preview"
          width={50}
          height={50}
          className="w-full h-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
        />
      )}

      <CreateProductButton isPending={isPending} />
    </form>
  );
};

type CreateProductButtonProps = {
  isPending: boolean;
};

const CreateProductButton = ({ isPending }: CreateProductButtonProps) => {
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
