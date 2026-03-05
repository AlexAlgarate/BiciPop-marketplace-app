'use client';

import { useActionState } from 'react';
import { createAdAction } from '../actions';
import { Category, ProductFormState } from '../../types';
import { CreateProductButton } from './CreateProductButton';
import { FormField } from './fields/FormField';
import { ImageUploadField } from './fields/ImageUploadField';
import { CategorySelectField } from './fields/CategoryField';

interface CreateAdFormProps {
  categories: Category[];
}

const initialState: ProductFormState = {
  success: false,
  message: '',
  requestId: 0,
};

export const CreateAdForm = ({ categories }: CreateAdFormProps) => {
  const [state, formAction, isPending] = useActionState(createAdAction, initialState);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 border border-border rounded-xl p-4"
    >
      {state.errors?.general && (
        <p className="text-red-500 text-sm">{state.errors.general}</p>
      )}

      <FormField label="Título" htmlFor="title" error={state.errors?.title}>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Ej: Bicicleta de montaña"
        />
      </FormField>

      <FormField
        label="Descripción"
        htmlFor="description"
        error={state.errors?.description}
      >
        <textarea
          id="description"
          name="description"
          rows={4}
          placeholder="Describe tu anuncio..."
          className="resize-none"
        />
      </FormField>

      <FormField label="Precio" htmlFor="price" error={state.errors?.price}>
        <input id="price" name="price" type="number" placeholder="0" />
      </FormField>

      <CategorySelectField categories={categories} error={state.errors?.categories} />

      <FormField label="Localización" htmlFor="location" error={state.errors?.location}>
        <input id="location" name="location" type="text" placeholder="Ej: Madrid" />
      </FormField>

      <ImageUploadField error={state.errors?.imageUrl} />

      <CreateProductButton isPending={isPending} />
    </form>
  );
};
