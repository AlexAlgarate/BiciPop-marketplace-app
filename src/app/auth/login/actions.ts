'use server';

import { AuthFormState } from '../types';
import { comparePassword } from '../utils/securityService';
import { getAuthUserByEmail } from '@/lib/users';
import { redirect } from 'next/navigation';
import { createSession } from '@/lib/auth';
import { loginSchema } from '@/lib/validation/authSchemas';
import { getFieldErrorsFromTree } from '@/lib/validation';

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
  const invalidCredentials = (email: string): AuthFormState => ({
    success: false,
    errors: {},
    values: { email },
    message: 'Credenciales inválidas',
  });
  const email = parsed.data.email.toLowerCase();

  const user = await getAuthUserByEmail(email);

  if (!user) {
    return invalidCredentials(emailInput);
  }

  const password = parsed.data.password;
  const validPassword = await comparePassword(password, user.passwordHash);

  if (!validPassword) {
    return invalidCredentials(emailInput);
  }

  await createSession(user.id);
  redirect('/');
}
