import prisma from '@/lib/prisma';

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
