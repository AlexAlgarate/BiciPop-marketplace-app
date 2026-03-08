import prisma from '@/lib/prisma';
import { AdsFilter } from './types';
import { mapToAdDTO } from '@/domain/ads/mappers';
import { getSession } from '@/lib/auth';

const getWhereClause = (userId: string, query: string) => {
  return {
    userId,
    ...(query && {
      title: {
        contains: query,
        mode: 'insensitive' as const,
      },
    }),
  };
};

export const getUserAds = async ({ query, order, page, pageSize }: AdsFilter) => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const session = await getSession();
  if (!session?.userId) {
    return {
      items: [],
      totalCount: 0,
      totalPages: 1,
      currentPage: 1,
    };
  }

  const safePage = Number.isNaN(page) || page < 1 ? 1 : page;
  const safePageSize = Number.isNaN(pageSize) || pageSize < 1 ? 5 : pageSize;

  const whereClause = getWhereClause(session.userId, query);
  const totalProjects = await prisma.advertisement.count({ where: whereClause });
  const totalPages = Math.max(1, Math.ceil(totalProjects / safePageSize));

  const currentPage = Math.min(safePage, totalPages);

  const items = await prisma.advertisement.findMany({
    where: whereClause,
    skip: (currentPage - 1) * safePageSize,
    take: safePageSize,
    orderBy: {
      createdAt: order,
    },
    include: {
      category: true,
      user: true,
    },
  });

  return {
    items: items.map(mapToAdDTO),
    totalCount: totalProjects,
    totalPages,
    currentPage,
  };
};
