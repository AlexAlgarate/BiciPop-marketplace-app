import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/advertisements';
import { ProductDetailView } from './ProductDetailView';
import { Metadata } from 'next';

type ProductDetailParams = Promise<{
  id: string;
}>;

export const generateMetadata = async (props: {
  params: ProductDetailParams;
}): Promise<Metadata> => {
  const { id } = await props.params;

  const product = await getProductById(Number(id));

  return {
    title: product
      ? `Bici: ${product.title} -- ${product.price} €`
      : 'Producto no encontrado',
    description: product
      ? `Detalles de la bicicleta: ${product.title}`
      : 'Producto no encontrado',
  };
};

const ProductDetailPage = async (props: { params: ProductDetailParams }) => {
  const { id } = await props.params;
  const product = await getProductById(Number(id));

  if (!product) return notFound();

  return <ProductDetailView product={product} />;
};

export default ProductDetailPage;
