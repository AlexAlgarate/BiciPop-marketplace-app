import { Metadata } from 'next';

import { getAds } from '@/features/all-products/api';
import { AllProductsView } from '@/features/all-products/components/AllProductsView';
import {
  AdsPageSearchParams,
  parseAdsSearchParams,
} from '@/features/all-products/utils/searchParams';

const PAGE_SIZE = 12;

export const metadata: Metadata = {
  title: 'BiciPop',
  description:
    'Página de compraventa de bicicletas de segunda mano. Aprovecha las ofertas.',
  creator: 'Alex Algarate',
};

export default async function Home(props: { searchParams: AdsPageSearchParams }) {
  const searchParams = await props.searchParams;
  const { query, order, page } = parseAdsSearchParams(searchParams);

  const {
    items: products,
    currentPage,
    totalPages,
  } = await getAds({ query, order, page, pageSize: PAGE_SIZE });

  return (
    <AllProductsView
      currentPage={currentPage}
      products={products}
      totalPages={totalPages}
    />
  );
}
