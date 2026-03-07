import { AdDTO } from '@/lib/types/ads.types';
import { formatCreatedDate, formatPrice } from '../../../../utils/formatters';
import { ProductHeader } from './header/ProductHeader';
import { AdManagementPanel } from './AdManagementPanel';
import { ContactSellerButton } from './ContactSellerButton';
import { SellerCard } from './SellerCard';

interface ProductInfoProps {
  product: AdDTO;
}

export const ProductInfoSection = ({ product }: ProductInfoProps) => {
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
      <AdManagementPanel adId={product.id} ownerId={product.userId} />
    </div>
  );
};
