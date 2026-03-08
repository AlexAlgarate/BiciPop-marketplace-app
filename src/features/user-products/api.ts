import prisma from '@/lib/prisma';
import { FilterUserProducts } from './types';
import { mapToAdDTO } from '@/domain/ads/mappers';
import { getSession } from '@/lib/auth';

type WhereClause = {
  price?:
    | {
        lte?: number | undefined;
        gte?: number | undefined;
      }
    | undefined;
  categoryId?: number | undefined;
  title?:
    | {
        contains: string;
        mode: 'insensitive';
      }
    | undefined;
  userId: string;
};

const getWhereClause = (
  userId: string,
  query: string,
  category?: number,
  minPrice?: number,
  maxPrice?: number,
): WhereClause => {
  return {
    userId,
    ...(query && {
      title: {
        contains: query,
        mode: 'insensitive' as const,
      },
    }),
    ...(category && {
      categoryId: Number(category),
    }),
    ...((minPrice !== undefined || maxPrice !== undefined) && {
      price: {
        ...(minPrice !== undefined && { gte: minPrice }),
        ...(maxPrice !== undefined && { lte: maxPrice }),
      },
    }),
  };
};
export const getUserAds = async (filters: FilterUserProducts) => {
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

  const { safePage, safePageSize } = getPagination(filters.page, filters.pageSize);

  const whereClause = getWhereClause(
    session.userId,
    filters.query,
    filters.category,
    filters.minPrice,
    filters.maxPrice,
  );

  const { items, totalProjects } = await findUsers(
    whereClause,
    safePage,
    safePageSize,
    filters.order,
  );

  const totalPages = Math.max(1, Math.ceil(totalProjects / safePageSize));

  const currentPage = Math.min(safePage, totalPages);

  return {
    items: items.map(mapToAdDTO),
    totalCount: totalProjects,
    totalPages,
    currentPage,
  };
};

const getPagination = (page: number, pageSize: number) => {
  const safePage = Number.isNaN(page) || page < 1 ? 1 : page;
  const safePageSize = Number.isNaN(pageSize) || pageSize < 1 ? 5 : pageSize;

  return { safePage, safePageSize };
};

const findUsers = async (
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

export const getCategories = async () => {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true },
  });
};
