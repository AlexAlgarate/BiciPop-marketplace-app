'use server';

import { AuthFormState } from '../types';
import { comparePassword } from '../utils/securityService';
import { getAuthUserByEmail } from '@/lib/users';
import { createSession } from '@/lib/auth/auth';
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
