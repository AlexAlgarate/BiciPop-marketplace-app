import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/advertisements';
import ProductDetailView from './ProductDetailView';

type ProductDetailParams = Promise<{
  id: string;
}>;
const ProductDetailPage = async (props: { params: ProductDetailParams }) => {
  const { id } = await props.params;
  const product = await getProductById(Number(id));

  if (!product) return notFound();

  return <ProductDetailView product={product} />;
};

export default ProductDetailPage;
