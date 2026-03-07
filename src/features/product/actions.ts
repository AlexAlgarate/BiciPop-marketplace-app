'use server';

import { deleteAd, getAdByOwner } from '@/features/product/api';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const deleteAdAction = async (formData: FormData) => {
  const session = await getSession();
  if (!session?.userId) redirect('/auth/login');

  const adId = Number(formData.get('adId'));
  const ad = await getAdByOwner(adId, session.userId);

  if (!ad) redirect('/');

  await deleteAd(adId);

  revalidatePath('/');
  redirect('/');
};
