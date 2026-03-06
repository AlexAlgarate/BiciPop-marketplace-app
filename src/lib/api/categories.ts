import prisma from '../prisma';

export const getAdCategories = async () => {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
};
