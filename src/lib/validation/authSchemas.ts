import z from 'zod';

export const registerSchema = z.object({
  email: z.email('Email no es válido'),
  password: z.string().min(4, 'La contraseña debe tener al menos 4 carácteres'),
  location: z.string(),
  username: z.string(),
});

export const loginSchema = z.object({
  email: z.email('Email no es válido'),
  password: z
    .string()
    .min(4, 'Recuerda que la contraseña debería tener al menos 4 caracteres'),
});
