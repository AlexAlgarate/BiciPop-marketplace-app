import { Pagination } from '@/components/pagination';
import { ProductCard } from '@/components/ProductCard';
import { getAdvertisements } from '@/lib/advertisements';
import Link from 'next/link';

const PAGE_SIZE = 12;

type SearchParamValue = string | string[] | undefined;
type AdsPageSearchParams = Promise<Record<string, SearchParamValue>>;

const getSingleSearchParam = (value: SearchParamValue) => {
  if (Array.isArray(value)) return value[0];
  return value;
};

const parseAdsSearchParams = (searchParams: Record<string, SearchParamValue>) => {
  return {
    query: getSingleSearchParam(searchParams.query) as string,
    order: getSingleSearchParam(searchParams.order) as 'asc' | 'desc',
    page: Number(getSingleSearchParam(searchParams.page)) || 1,
  };
};

export default async function Home(props: { searchParams: AdsPageSearchParams }) {
  const searchParams = await props.searchParams;
  const { query, order, page } = parseAdsSearchParams(searchParams);

  const {
    items: products,
    currentPage,
    totalPages,
  } = await getAdvertisements({ query, order, page, pageSize: PAGE_SIZE });

  return (
    <div className="pb-20 space-y-12">
      <HeroSection />

      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">
            Novedades en BiciPop
          </h2>
        </div>

        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-12">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </section>
    </div>
  );
}

const HeroSection = () => {
  return (
    <section className="relative bg-zinc-900 text-white py-20 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-black/80 to-transparent z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 grayscale"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            Dale una segunda vida <br /> a tu bicicleta.
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            El marketplace especializado para ciclistas. Compra y vende carretera, MTB,
            gravel y componentes con total confianza.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products/create"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-full font-bold transition-transform active:scale-95 text-center"
            >
              Vender mi bici
            </Link>
            <Link
              href="/"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-3.5 rounded-full font-bold transition-all text-center"
            >
              Ver bicicletas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-border rounded-2xl bg-secondary/20 text-center">
    <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4 shadow-sm text-2xl">
      🚲
    </div>
    <h3 className="text-xl font-semibold mb-2">No hay bicicletas disponibles</h3>
    <p className="text-muted-foreground mb-6 max-w-md">
      Parece que nadie ha publicado nada aún. ¡Sé el primero en vender tu bici!
    </p>
    <Link
      href="/products/create"
      className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full py-2.5 px-6 shadow-lg transition-transform hover:-translate-y-0.5"
    >
      Publicar anuncio
    </Link>
  </div>
);
