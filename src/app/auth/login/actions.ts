'use server';

import { AuthFormState } from '../types';
import { comparePassword } from '../utils/securityService';
import z from 'zod';
import { getAuthUserByEmail } from '@/lib/users';
import { redirect } from 'next/navigation';
import { createSession } from '@/lib/auth';

const loginSchema = z.object({
  email: z.email('Email no es válido'),
  password: z.string().min(4, 'La contraseña debe tener al menos 4 caracteres'),
});

const getFieldErrorsFromTree = (
  error: z.ZodError<z.infer<typeof loginSchema>>,
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
