import { AdDTO } from '@/lib/types/ads.types';
import { ProductImageSection } from './image-column/ProductImageSection';
import { ProductInfoSection } from './info-column/ProductInfoSection';
import { BackToHomeLink } from '@/components/BackToHomeLink';

interface Props {
  product: AdDTO;
}

export const ProductDetailView = ({ product }: Props) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <BackToHomeLink />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <ProductImageSection product={product} />
        <ProductInfoSection product={product} />
      </div>
    </div>
  );
};
