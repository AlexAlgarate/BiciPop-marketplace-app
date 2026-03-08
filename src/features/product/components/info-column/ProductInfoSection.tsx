import { ProductHeader } from './product-header/ProductHeader';
import { AdManagementPanel } from './ActionButtons';
import { ContactSellerButton } from './ContactSellerButton';
import { SellerCard } from './SellerCard';
import { formatCreatedDate, formatPrice } from '@/features/product/formatters';
import { AdDTO } from '@/domain/ads/types';

interface ProductInfoProps extends AdDTO {
  isLiked: boolean;
  isOwner: boolean;
}

export const ProductInfoSection = ({ product }: { product: ProductInfoProps }) => {
  const price = formatPrice(product.price);
  const publishedAgo = formatCreatedDate(product.createdAt);

  return (
    <div className="flex flex-col gap-6">
      <ProductHeader
        title={product.title}
        price={price}
        location={product.location}
        publishedAgo={publishedAgo}
        likes={product.likes}
        productId={product.id}
        isLiked={product.isLiked}
        isOwner={product.isOwner}
      />

      <div className="h-px bg-border w-full" />

      <SellerCard username={product.userName} />
      <ContactSellerButton />
      <AdManagementPanel adId={product.id} ownerId={product.userId} />
    </div>
  );
};
