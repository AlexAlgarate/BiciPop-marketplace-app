'use server';

import { AuthFormState } from '../../../features/auth/types';
import prisma from '@/lib/prisma';
import { hashPassword } from '../../../features/auth/security';
import { getUserByEmail } from '@/features/auth/api';
import { registerSchema } from '@/features/auth/validation';
import { getFieldErrorsFromTree } from '@/lib/validations/validation-errors';

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

  const { email, password, username, location } = parsed.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      success: false,
      message: 'El usuario ya existe',
      errors: {},
      values: { username: usernameInput, location: locationInput },
    };
  }

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

  // TODO Llevarlo a lib/api/users
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
    message: 'Usuario creado correctamente',
    errors: {},
    values: {},
  };
}
