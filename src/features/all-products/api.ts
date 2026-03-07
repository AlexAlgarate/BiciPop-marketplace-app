import prisma from '../../lib/prisma';
import { mapToAdDTO } from '@/domain/ads/mappers';
import { AdsFilter, AdsResultDto } from './types';

function getWhereClause(query: string) {
  if (!query) {
    return {};
  }

  return {
    title: {
      contains: query,
      mode: 'insensitive' as const,
    },
  };
}

export async function getAds({
  query,
  order,
  page,
  pageSize,
}: AdsFilter): Promise<AdsResultDto> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const safePage = Number.isNaN(page) || page < 1 ? 1 : page;
  const safePageSize = Number.isNaN(pageSize) || pageSize < 1 ? 5 : pageSize;

  const whereClause = getWhereClause(query);
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
}
