import { ShareButton } from './SharedButton';
import { FavoriteButton } from './FavoriteButton';
import { ProductMeta } from './ProductMeta';

interface HeaderProps {
  title: string;
  price: string;
  location: string;
  publishedAgo: string;
}

export const ProductHeader = ({
  title,
  price,
  location,
  publishedAgo,
}: HeaderProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
          {title}
        </h1>
        <div className="flex gap-2">
          <ShareButton />
          <FavoriteButton />
        </div>
      </div>
      <p className="text-4xl font-bold text-primary">{price}</p>
      <ProductMeta location={location} publishedAgo={publishedAgo} />
    </div>
  );
};
