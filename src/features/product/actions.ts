'use server';

import { deleteAd, getAdByOwner, incrementProductLikes } from '@/features/product/api';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const deleteAdAction = async (formData: FormData): Promise<never> => {
  const session = await getSession();
  if (!session?.userId) redirect('/auth/login');

  const adId = Number(formData.get('adId'));
  const ad = await getAdByOwner(adId, session.userId);

  if (!ad) redirect('/');

  await deleteAd(adId);

  revalidatePath('/');
  redirect('/');
};

export const incrementProductLikesAction = async (
  productId: number,
): Promise<number> => {
  const session = await getSession();
  if (!session?.userId) redirect('/auth/login');

  const updatedLikes = await incrementProductLikes(productId);
  revalidatePath(`/products/${productId}`);

  return updatedLikes;
};
