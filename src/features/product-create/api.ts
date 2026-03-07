import prisma from '@/lib/prisma';
import { CreateAdDTO } from './types';
import { AdDTO } from '@/domain/ads/types';
import { mapToAdDTO } from '@/domain/ads/mappers';

export const createAd = async (data: CreateAdDTO): Promise<AdDTO> => {
  const ad = await prisma.advertisement.create({
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      imageUrl: data.imageUrl,
      location: data.location,
      userId: data.userId,
      categoryId: data.categoryId,
    },
    include: {
      category: true,
      user: true,
    },
  });
  return mapToAdDTO(ad);
};
