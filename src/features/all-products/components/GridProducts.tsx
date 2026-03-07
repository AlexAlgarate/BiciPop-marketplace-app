import { Pagination } from '@/components/Pagination';
import { ProductCard } from '@/components/ProductCard';
import { EmptyState } from './EmptyState';
import { getAds } from '../api';
import { AdsSearchParams } from '../utils/searchParams';
import { PRODUCTS_PER_PAGE } from '@/utils/constants';

export const ProductsGrid = async ({ query, order, page }: AdsSearchParams) => {
  const {
    items: products,
    currentPage,
    totalPages,
  } = await getAds({ query, order, page, pageSize: PRODUCTS_PER_PAGE });

  if (products.length === 0) return <EmptyState />;
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
