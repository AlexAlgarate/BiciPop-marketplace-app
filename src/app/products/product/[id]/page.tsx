import { AdDTO } from '@/lib/ads.types';
import { getProductById } from '@/lib/advertisements';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type ProductDetailParams = Promise<{
  id: string;
}>;

const ProductDetail = async (props: { params: ProductDetailParams }) => {
  const { id } = await props.params;

  let product: AdDTO | null = null;
  try {
    product = await getProductById(Number(id));
  } catch {
    console.error(`[ProductDetail] Error al obtener el producto con ID ${id}`);
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="flex flex-col border border-border rounded-2xl gap-3 p-5">
      <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
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
      <p>description: {product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: {product.price} €</p>
      <p>Username: {product.userName}</p>
      <p>Location: {product.location}</p>
    </div>
  );
};

export default ProductDetail;
