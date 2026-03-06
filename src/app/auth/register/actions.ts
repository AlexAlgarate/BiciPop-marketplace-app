'use server';

import { AuthFormState } from '../types';
import prisma from '@/lib/prisma';
import { hashPassword } from '../utils/securityService';
import { getUserByEmail } from '@/lib/api/users';
import { registerSchema } from '@/lib/validation/authSchemas';
import { getFieldErrorsFromTree } from '@/lib/validation';

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
