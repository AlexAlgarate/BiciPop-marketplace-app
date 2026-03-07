'use server';

import { AuthFormState } from '@/features/auth/types';
import { comparePassword, hashPassword } from './security';
import { getAuthUserByEmail, getUserByEmail } from '@/features/auth/api';
import { createSession } from '@/lib/auth';
import { loginSchema, registerSchema } from '@/features/auth/validation';
import { getFieldErrorsFromTree } from '@/lib/validations/validation-errors';

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const emailInput = String(formData.get('email'));
  const passwordInput = String(formData.get('password'));

  const parsed = loginSchema.safeParse({
    email: emailInput,
    password: passwordInput,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: 'Revisa los campos marcados',
      errors: getFieldErrorsFromTree(parsed.error),
      values: { email: emailInput },
    };
  }

  const email = parsed.data.email.toLowerCase();
  const user = await getAuthUserByEmail(email);

  if (!user) return invalidCredentials(emailInput);

  const validPassword = await comparePassword(parsed.data.password, user.passwordHash);

  if (!validPassword) return invalidCredentials(emailInput);

  await createSession(user.id);
  return {
    success: true,
    message: 'Sesión iniciada correctamente',
    errors: {},
    values: {},
  };
}

const invalidCredentials = (email: string): AuthFormState => ({
  success: false,
  message: 'Credenciales inválidas',
  errors: {},
  values: { email },
});

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

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

export const logout = async () => {
  const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? 'session-token';

  const cookieStore = await cookies();

  cookieStore.delete(AUTH_COOKIE_NAME);
  redirect('/');
};
