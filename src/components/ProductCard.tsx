import Image from 'next/image';
import { MapPin, Clock } from 'lucide-react';
import { timeAgo } from '@/utils/date';

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  likes: number;
  imageUrl: string;
  userName: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const ProductCard = ({ product }: { product: ProductCardProps }) => {
  return (
    <div
      className="group cursor-pointer flex flex-col gap-2 h-full bg-white border border-gray-200
      rounded-xl shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all
      duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
    >
      <ProductImage product={product} />
      <ProductInfo product={product} />
    </div>
  );
};

const ProductInfo = ({ product }: { product: ProductCardProps }) => {
  const created =
    typeof product.createdAt === 'string'
      ? new Date(product.createdAt)
      : product.createdAt;

  return (
    <div className="p-4 flex flex-col flex-1">
      <div className="mb-2">
        <div className="flex justify-between items-start gap-2">
          <h3
            className="font-semibold text-gray-900 line-clamp-1 text-base"
            title={product.title}
          >
            {product.title}
          </h3>
        </div>
        <p className="text-[#00C18A] font-bold text-xl">{formatPrice(product.price)}</p>
      </div>

      <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
        {product.description}
      </p>

      <div className="mt-auto flex items-center justify-start gap-3 text-xs text-gray-500 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-gray-400" />
          <span className="truncate max-w-25">{product.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          <span title={created.toLocaleDateString()}>{timeAgo(created)}</span>
        </div>
      </div>
    </div>
  );
};

const ProductImage = ({ product }: { product: ProductCardProps }) => {
  return (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 border border-gray-100 shadow-sm">
      <span className="absolute top-3 left-3 z-10 bg-white/70 backdrop-blur-sm px-2 py-1 text-xs font-semibold rounded-full text-gray-700 shadow-sm">
        {product.category}
      </span>

      <Image
        src={product.imageUrl}
        alt={product.title}
        fill
        loading="eager"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};
