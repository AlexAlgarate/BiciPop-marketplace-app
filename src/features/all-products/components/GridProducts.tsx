import { Pagination } from '@/components/Pagination';
import { ProductCard } from '@/components/ProductCard';
import { EmptyState } from './EmptyState';
import { getProducts } from '../api';
import { AdsSearchParams } from '../../shared/types/search-params.types';
import { PRODUCTS_PER_PAGE } from '@/utils/constants';

export const ProductsGrid = async (params: AdsSearchParams) => {
  const {
    items: products,
    currentPage,
    totalPages,
  } = await getProducts({
    ...params,
    pageSize: PRODUCTS_PER_PAGE,
  });

  if (products.length === 0) return <EmptyState query={params.query} />;
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </>
  );
};
