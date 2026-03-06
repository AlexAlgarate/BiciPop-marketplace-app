import prisma from './prisma';
import { AdDTO, AdsResultDto, CreateAdDTO } from './ads.types';

interface AdsFilter {
  query: string;
  order: 'asc' | 'desc';
  page: number;
  pageSize: number;
}

type AdvertisementWithRelations = {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  userId: string;
  categoryId: number;
  location: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
  category: { name: string };
  user: { username: string };
};

const mapToAdDTO = (ad: AdvertisementWithRelations): AdDTO => {
  return {
    id: ad.id,
    title: ad.title,
    description: ad.description,
    price: ad.price,
    imageUrl: ad.imageUrl,
    userId: ad.userId,
    categoryId: ad.categoryId,
    location: ad.location,
    likes: ad.likes,
    createdAt: ad.createdAt,
    updatedAt: ad.updatedAt,
    category: ad.category.name,
    userName: ad.user.username,
  };
};

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

export const getProductById = async (id: number): Promise<AdDTO | null> => {
  const ad = await prisma.advertisement.findUnique({
    where: { id },
    include: {
      category: true,
      user: true,
    },
  });

  if (!ad) return null;

  return mapToAdDTO(ad);
};

export const createAdvertisement = async (data: CreateAdDTO): Promise<AdDTO> => {
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
