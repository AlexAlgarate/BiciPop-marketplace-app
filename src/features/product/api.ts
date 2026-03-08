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

export const toggleFavorite = async (
  userId: string,
  advertisementId: number,
): Promise<{ liked: boolean; likesCount: number }> => {
  const existingFavorite = await prisma.favorite.findUnique({
    where: {
      userId_advertisementId: {
        userId,
        advertisementId,
      },
    },
  });

  if (existingFavorite) {
    await prisma.favorite.delete({
      where: {
        userId_advertisementId: {
          userId,
          advertisementId,
        },
      },
    });
  } else {
    await prisma.favorite.create({
      data: {
        userId,
        advertisementId,
      },
    });
  }

  const likesCount = await prisma.favorite.count({
    where: { advertisementId },
  });

  return { liked: !existingFavorite, likesCount };
};

export const getAdWithFavoriteStatus = cache(
  async (
    id: number,
    userId: string | null,
  ): Promise<(AdDTO & { isLiked: boolean; isOwner: boolean }) | null> => {
    const ad = await prisma.advertisement.findUnique({
      where: { id },
      include: {
        category: true,
        user: true,
      },
    });

    if (!ad) return null;

    const isLiked =
      userId !== null
        ? !!(await prisma.favorite.findUnique({
            where: {
              userId_advertisementId: {
                userId,
                advertisementId: id,
              },
            },
          }))
        : false;

    const likesCount = await prisma.favorite.count({
      where: { advertisementId: id },
    });

    return {
      ...mapToAdDTO(ad),
      likes: likesCount,
      isLiked,
      isOwner: ad.userId === userId,
    };
  },
);
