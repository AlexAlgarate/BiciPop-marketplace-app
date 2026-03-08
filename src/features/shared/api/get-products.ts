import prisma from '@/lib/prisma';
import { WhereClause } from '../utils/build-filters';
import { AdDTO } from '@/domain/ads/types';

export type AdWithFavoriteStatus = AdDTO & {
  isLiked: boolean;
  isOwner: boolean;
};

export const findUsers = async (
  whereClause: WhereClause,
  page: number,
  pageSize: number,
  order: 'asc' | 'desc',
  userId: string | null,
): Promise<{ items: AdWithFavoriteStatus[]; totalProjects: number }> => {
  const totalProjects = await prisma.advertisement.count({ where: whereClause });

  const items = await prisma.advertisement.findMany({
    where: whereClause,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      createdAt: order,
    },
    include: {
      category: true,
      user: true,
    },
  });

  const itemsWithFavoriteStatus: AdWithFavoriteStatus[] = await Promise.all(
    items.map(async (item) => {
      const isLiked =
        userId !== null
          ? !!(await prisma.favorite.findUnique({
              where: {
                userId_advertisementId: {
                  userId,
                  advertisementId: item.id,
                },
              },
            }))
          : false;

      const likesCount = await prisma.favorite.count({
        where: { advertisementId: item.id },
      });

      return {
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
        imageUrl: item.imageUrl,
        userId: item.userId,
        categoryId: item.categoryId,
        location: item.location,
        likes: likesCount,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        category: item.category.name,
        userName: item.user.username,
        isLiked,
        isOwner: item.userId === userId,
      };
    }),
  );

  return { items: itemsWithFavoriteStatus, totalProjects };
};
