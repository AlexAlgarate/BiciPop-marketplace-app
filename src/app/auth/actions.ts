'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const logout = async () => {
  const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? 'session-token';

  const cookieStore = await cookies();

  cookieStore.delete(AUTH_COOKIE_NAME);
  redirect('/');
};
