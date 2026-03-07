import { cache } from 'react';

import { mapToAdDTO } from '@/domain/ads/mappers';
import { AdDTO } from '@/domain/ads/types';
import prisma from '@/lib/prisma';

export const getAdById = cache(async (id: number): Promise<AdDTO | null> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const ad = await prisma.advertisement.findUnique({
    where: { id },
    include: {
      category: true,
      user: true,
    },
  });

  if (!ad) return null;

  return mapToAdDTO(ad);
});

export const getAdByOwner = async (
  adId: number,
  userId: string,
): Promise<{ id: number } | null> => {
  return prisma.advertisement.findUnique({
    where: { id: adId, userId },
    select: { id: true },
  });
};

export const deleteAd = async (adId: number) => {
  return prisma.advertisement.delete({ where: { id: adId } });
};
