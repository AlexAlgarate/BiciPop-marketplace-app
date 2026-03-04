'use server';

import { cookies } from 'next/headers';

// TODO fix logout
export async function logout() {
  const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? 'session-token';

  (await cookies()).delete(AUTH_COOKIE_NAME);
}
