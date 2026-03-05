import prisma from './prisma';

export const getCategories = async () => {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
};
