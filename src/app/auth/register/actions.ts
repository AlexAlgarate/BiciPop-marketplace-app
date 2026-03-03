'use server';

import z from 'zod';
import { AuthFormState } from '../types';
import prisma from '@/lib/prisma';
import { hashPassword } from '../utils/securityService';
import { getUserByEmail } from '@/lib/users';

const registerSchema = z.object({
  email: z.email('Email no es válido'),
  password: z.string().min(4, 'La contraseña debe tener al menos 4 carácteres'),
  location: z.string(),
  username: z.string(),
});

const getFieldErrorsFromTree = (
  error: z.ZodError<z.infer<typeof registerSchema>>,
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

export async function registerAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const emailInput = String(formData.get('email'));
  const passwordInput = String(formData.get('password'));
  const locationInput = String(formData.get('location'));
  const usernameInput = String(formData.get('username'));

  const parsed = registerSchema.safeParse({
    email: emailInput,
    password: passwordInput,
    location: locationInput,
    username: usernameInput,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: 'Revisa los campos marcados',
      errors: getFieldErrorsFromTree(parsed.error),
      values: {
        email: emailInput,
        username: usernameInput,
        location: locationInput,
      },
    };
  }
  const email = parsed.data.email.toLowerCase();
  const user = await getUserByEmail(email);

  if (user) {
    return {
      success: false,
      message: 'El usuario ya existe',
      errors: {},
      values: { username: usernameInput, location: locationInput },
    };
  }

  const password = parsed.data.password;

  const passwordHash = await hashPassword(password);

  if (!passwordHash) {
    return {
      success: false,
      message: 'Credenciales incorrectas',
      errors: {},
      values: {
        email: emailInput,
        username: usernameInput,
        location: locationInput,
      },
    };
  }
  const username = parsed.data.username;
  const location = parsed.data.location;

  await prisma.user.create({
    data: {
      email,
      username,
      passwordHash,
      location,
    },
  });

  return {
    success: true,
    errors: {},
    message: 'Usuario creado correctamente',
    values: { email: '', password: '' },
  };
}
