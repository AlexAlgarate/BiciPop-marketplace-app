export type WhereClause = {
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
};

export const getWhereClause = (
  query: string,
  category?: number,
  minPrice?: number,
  maxPrice?: number,
): WhereClause => {
  return {
    ...(query && { title: { contains: query, mode: 'insensitive' as const } }),
    ...(category && { categoryId: Number(category) }),
    ...((minPrice || maxPrice) && {
      price: {
        ...(minPrice && { gte: minPrice }),
        ...(maxPrice && { lte: maxPrice }),
      },
    }),
  };
};

export const getPagination = (page: number, pageSize: number) => {
  const safePage = Number.isNaN(page) || page < 1 ? 1 : page;
  const safePageSize = Number.isNaN(pageSize) || pageSize < 1 ? 5 : pageSize;

  return { safePage, safePageSize };
};
