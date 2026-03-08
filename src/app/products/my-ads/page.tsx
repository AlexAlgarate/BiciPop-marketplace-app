import { AllProductsView } from '@/features/user-products/components/AllProductsView';
import { ProductsGridSkeleton } from '@/features/all-products/components/ProductsGridSkeleton';
import {
  AdsPageSearchParams,
  parseAdsSearchParams,
} from '@/features/user-products/utils/searchParams';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { UserProductsGrid } from '@/features/user-products/components/GridUserProducts';

export const metadata: Metadata = {
  title: 'Mis anuncios -- BiciPop',
  description:
    'Mis anuncios publicados en BiciPop, la plataforma de compraventa de bicicletas de segunda mano.',
  creator: 'Alex Algarate',
};

const MyProductsPage = async ({
  searchParams,
}: {
  searchParams: AdsPageSearchParams;
}) => {
  const params = parseAdsSearchParams(await searchParams);

  return (
    <AllProductsView searchParams={params}>
      <Suspense fallback={<ProductsGridSkeleton />}>
        <UserProductsGrid {...params} />
      </Suspense>
    </AllProductsView>
  );
};

export default MyProductsPage;
