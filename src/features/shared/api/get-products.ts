import prisma from '@/lib/prisma';
import { WhereClause } from '../utils/build-filters';

export const findUsers = async (
  whereClause: WhereClause,
  page: number,
  pageSize: number,
  order: 'asc' | 'desc',
) => {
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
  return { items, totalProjects };
};
