import prisma from './prisma';
import { AdsResultDto } from './ads.types';

interface AdsFilter {
  query: string;
  order: 'asc' | 'desc';
  page: number;
  pageSize: number;
}

// interface CreateAdInput {
//   title: string;
//   description: string;
//   price:number;
//   imageUrl: string;
//   location:string;
//   category:string;
//   userId: string;
// }

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

export async function getAdvertisements({
  query,
  order,
  page,
  pageSize,
}: AdsFilter): Promise<AdsResultDto> {
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
  });

  return {
    items,
    totalCount: totalProjects,
    totalPages,
    currentPage,
  };
}

// export async function createProject(input: CreateAdInput): Promise<AdDTO> {
//   return prisma.advertisement.create({
//     data: {
//       title: input.title,
//       description: input.description || 'autogenerado',
//       imageUrl: input.imageUrl,
//       userId: input.userId,
//       price: input.price,
//       location: input.location,
//       category: input.category
//     },
//   })}
