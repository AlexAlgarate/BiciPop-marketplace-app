'use client';
import Image from 'next/image';
import { MapPin, Clock, Heart, User } from 'lucide-react';
import { timeAgo } from '@/utils/date';
import Link from 'next/link';
import { Button } from './ui/Button';

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

const formatLikes = (likes: number) => {
  if (likes >= 1000) {
    return (likes / 1000).toFixed(1) + 'k';
  }
  return likes;
};

export const ProductCard = ({ product }: { product: ProductCardProps }) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col h-full bg-white border border-border
      rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all
      duration-300 overflow-hidden"
    >
      <ProductImage product={product} />
      <ProductInfo product={product} />
    </Link>
  );
};

const ProductInfo = ({ product }: { product: ProductCardProps }) => {
  const created =
    typeof product.createdAt === 'string'
      ? new Date(product.createdAt)
      : product.createdAt;

  return (
    <div className="flex flex-col flex-1 p-4">
      <div className="flex justify-between items-start gap-3 mb-2">
        <h3
          className="font-semibold text-gray-900 line-clamp-1 text-base leading-tight min-w-0 flex-1"
          title={product.title}
        >
          {product.title}
        </h3>
        <p className="text-[#00C18A] font-bold text-lg whitespace-nowrap">
          {formatPrice(product.price)}
        </p>
      </div>

      <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed h-10">
        {product.description}
      </p>

      <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0 border border-gray-200">
            <User className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-medium text-gray-700 truncate max-w-25">
            {product.userName}
          </span>
        </div>

        <div className="flex flex-col items-end text-[10px] text-gray-400 gap-0.5">
          <div className="flex items-center gap-1">
            <span className="truncate max-w-20">{product.location}</span>
            <MapPin className="w-3 h-3" />
          </div>
          <div className="flex items-center gap-1.5">
            <span title={created.toLocaleDateString()}>{timeAgo(created)}</span>
            <Clock className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductImage = ({ product }: { product: ProductCardProps }) => {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('Liked ->', product.id);
  };

  return (
    <div className="relative w-full aspect-square overflow-hidden bg-gray-100 border-b border-border">
      <span className="absolute top-3 left-3 z-10 bg-white/70 backdrop-blur-md px-2.5 py-1 text-xs uppercase font-bold rounded-full tracking-wide text-gray-700 shadow-sm">
        {product.category}
      </span>

      <Button
        onClick={handleClick}
        aria-label="Like product"
        className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-quite/90 backdrop-blur-md
        px-2.5 py-1.5 text-gray-700 shadow-sm hover:text-red-500 hover:bg-white "
      >
        <Heart className="w-3.5 h-3.5 transition-colors" />
        <p className="text-xs font-semibold">{formatLikes(product.likes)}</p>
      </Button>

      <Image
        src={product.imageUrl}
        alt={product.title}
        fill
        loading="eager"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
};
