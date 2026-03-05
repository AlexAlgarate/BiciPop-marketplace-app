import { AdDTO } from '@/lib/ads.types';

import { ProductImageSection } from './components/ProductImageSection';
import { BackToHomeLink } from './components/BackToHomeLink';
import { ProductHeader } from './components/header/ProductHeader';
import { SellerCard } from './components/SellerCard';
import { AdManagementPanel } from './components/AdManagementPanel';
import { ContactSellerButton } from './components/ContactSellerButton';
import { formatCreatedDate, formatPrice } from './formatters';

interface Props {
  product: AdDTO;
}

const ProductDetailView = ({ product }: Props) => {
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

interface ProductInfoProps {
  product: AdDTO;
}

const ProductInfoSection = ({ product }: ProductInfoProps) => {
  const price = formatPrice(product.price);
  const publishedAgo = formatCreatedDate(product.createdAt);

  return (
    <div className="flex flex-col gap-6">
      <ProductHeader
        title={product.title}
        price={price}
        location={product.location}
        publishedAgo={publishedAgo}
      />

      <div className="h-px bg-border w-full" />

      <SellerCard username={product.userName} />
      <ContactSellerButton />
      <AdManagementPanel />
    </div>
  );
};

export default ProductDetailView;
