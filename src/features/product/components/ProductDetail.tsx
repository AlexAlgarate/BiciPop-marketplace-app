import { notFound } from 'next/navigation';
import { getAdById } from '../api';
import { ProductImageSection } from './image-column/ProductImageSection';
import { ProductInfoSection } from './info-column/ProductInfoSection';

interface Props {
  id: number;
}

export const ProductDetail = async ({ id }: Props) => {
  const product = await getAdById(id);

  if (!product) return notFound();

  return (
    <>
      <ProductImageSection product={product} />
      <ProductInfoSection product={product} />
    </>
  );
};
