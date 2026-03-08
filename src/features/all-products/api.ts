import { mapToAdDTO } from '@/domain/ads/mappers';
import { AdsResultDto } from './types';
import { getPagination, getWhereClause } from '../shared/utils/build-filters';
import { FilterProducts } from '../shared/types/filter.types';
import { findUsers } from '../shared/api/get-products';

export async function getProducts(filters: FilterProducts): Promise<AdsResultDto> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const { safePage, safePageSize } = getPagination(filters.page, filters.pageSize);

  const whereClause = getWhereClause(
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
}
