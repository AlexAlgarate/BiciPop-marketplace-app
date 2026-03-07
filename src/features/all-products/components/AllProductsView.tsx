import { AdDTO } from '@/domain/ads/types';
import { HeroSection } from './HeroSection';
import { EmptyState } from './EmptyState';
import { ProductCard } from '@/components/ProductCard';
import { Pagination } from '@/components/Pagination';

interface Props {
  products: AdDTO[];
  currentPage: number;
  totalPages: number;
}

export const AllProductsView = ({ products, currentPage, totalPages }: Props) => {
  return (
    <div className="pb-20 space-y-12">
      <HeroSection />

      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground tracking-tight mb-8">
          Novedades en BiciPop
        </h2>

        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-12">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </section>
    </div>
  );
};
