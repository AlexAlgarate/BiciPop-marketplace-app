import z from 'zod';

export const createAdSchema = z.object({
  title: z
    .string()
    .min(1, 'El título es obligatorio')
    .max(30, 'El título es demasiado largo. Máx. 30 caracteres.'),
  description: z
    .string()
    .min(1, 'La descripción es obligatoria')
    .max(200, 'La descripción no puede tener más de 200 caracteres'),
  price: z.number().positive('El precio tiene que ser positivo').min(1),
  categoryId: z.number().positive(),
  location: z
    .string()
    .min(1, 'La localidad es obligatoria')
    .max(20, 'La localidad es demasiado largoa. Máx. 20 caracteres.'),
});
