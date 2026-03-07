import { Metadata } from 'next';

import { AllProductsView } from '@/features/all-products/components/AllProductsView';
import {
  AdsPageSearchParams,
  parseAdsSearchParams,
} from '@/features/all-products/utils/searchParams';
import { Suspense } from 'react';
import { ProductsGrid } from '@/features/all-products/components/GridProducts';
import { ProductsGridSkeleton } from '@/components/ProductsGridSkeleton';

export const metadata: Metadata = {
  title: 'BiciPop',
  description:
    'Página de compraventa de bicicletas de segunda mano. Aprovecha las ofertas.',
  creator: 'Alex Algarate',
};

export default async function Home({
  searchParams,
}: {
  searchParams: AdsPageSearchParams;
}) {
  const params = parseAdsSearchParams(await searchParams);

  return (
    <AllProductsView>
      <Suspense fallback={<ProductsGridSkeleton />}>
        <ProductsGrid {...params} />
      </Suspense>
    </AllProductsView>
  );
}
