'use server';

import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import z from 'zod';
import { ProductFormState } from '../types';
import { createAdvertisement } from '@/lib/advertisements';
import { saveImageInPublic } from '@/lib/uploads';
import { revalidatePath } from 'next/cache';

const createAdSchema = z.object({
  title: z
    .string()
    .min(1, 'El título es obligatorio')
    .max(30, 'El título es demasiado largo. Máx. 30 caracteres.'),
  description: z
    .string()
    .min(1, 'La descripción es obligatoria')
    .max(200, 'La descripción no puede tener más de 200 caracteres'),
  price: z
    .number()
    .positive('El precio tiene que ser positivo')
    .min(0.01, 'El precio tiene que ser al menos 0.01'),
  categoryId: z.number().positive(),
  location: z
    .string()
    .min(1, 'La localidad es obligatoria')
    .max(20, 'La localidad es demasiado largoa. Máx. 20 caracteres.'),
});

const getFieldErrorsFromTree = (
  error: z.ZodError<z.infer<typeof createAdSchema>>,
): Record<string, string[]> => {
  const tree = z.treeifyError(error);
  const fieldErrors: Record<string, string[]> = {};

  for (const [fieldName, node] of Object.entries(tree.properties ?? {})) {
    if (node?.errors.length) {
      fieldErrors[fieldName] = node.errors;
    }
  }

  return fieldErrors;
};

export const createAdAction = async (
  _previousState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> => {
  const session = await getSession();
  if (!session?.userId) {
    redirect('/auth/login');
  }

  const titleInput = String(formData.get('title'));
  const descriptionInput = String(formData.get('description'));
  const locationInput = String(formData.get('location'));
  const priceInput = Number(formData.get('price'));
  const categoryIdInput = Number(formData.get('categoryId'));

  const parsed = createAdSchema.safeParse({
    title: titleInput,
    description: descriptionInput,
    location: locationInput,
    price: priceInput,
    categoryId: categoryIdInput,
  });

  if (!parsed.success) {
    return {
      success: false,
      message:
        'Hay errores en el formulario. Por favor, corrígelos e intenta de nuevo.',
      errors: getFieldErrorsFromTree(parsed.error),
      requestId: Date.now(),
    };
  }

  const image = formData.get('imageUrl') as File;
  const validImage = isValidImage(image);
  if (!validImage) {
    return {
      success: false,
      message: 'El archivo debe ser una imagen',
      requestId: Date.now(),
    };
  }
  const imageUrl = await saveImageInPublic(image);

  try {
    const data = parsed.data;
    await createAdvertisement({
      ...data,
      imageUrl,
      userId: session.userId,
    });
    revalidatePath(`/products`);

    return {
      success: true,
      message: 'Anuncio creado exitosamente',
      requestId: Date.now(),
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error creando el anuncio.';
    return {
      success: false,
      message: errorMessage,
      requestId: Date.now(),
    };
  }
};

const VALID_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/jpg']);

const isValidImage = (image: File | null): image is File =>
  !!image && VALID_IMAGE_TYPES.has(image.type);
