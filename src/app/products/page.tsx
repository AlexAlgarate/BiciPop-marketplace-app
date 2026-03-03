import { Pagination } from '@/components/pagination';
import { ProductCard } from '@/components/ProductCard';
import { getAdvertisements } from '@/lib/advertisements';
import {
  Book,
  Smartphone,
  Shirt,
  House,
  Baby,
  Wrench,
  Dumbbell,
  Car,
} from 'lucide-react';

const PAGE_SIZE = 12;

type SearchParamValue = string | string[] | undefined;

type AdsPageSearchParams = Promise<Record<string, SearchParamValue>>;

export const Home = async (props: { searchParams: AdsPageSearchParams }) => {
  const searchParams = await props.searchParams;

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20">
        <HeroSection />
        <CategoriesSection />
        <LatestProducts searchParams={searchParams} />
      </main>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 mt-6">
      <div className="bg-accent rounded-2xl p-8 md:p-16 text-center text-accent-foreground shadow-lg relative overflow-hidden">
        {/* Background decoration (opcional) */}
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-tr from-accent/20 to-transparent pointer-events-none"></div>

        <h1 className="text-3xl md:text-5xl font-bold mb-4 relative z-10">
          Buy and sell second-hand <br /> products
        </h1>
        <p className="mb-8 max-w-2xl mx-auto text-lg relative z-10">
          Give a second life to things you no longer use. Find amazing deals on
          electronics, fashion, vehicles, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <button className="bg-card text-accent px-8 py-3 rounded-full font-bold hover:bg-secondary transition">
            Start Exploring
          </button>
          <button className="bg-transparent border-2 border-accent-foreground text-accent-foreground px-8 py-3 rounded-full font-bold hover:bg-accent-foreground/10 transition">
            Sell Something
          </button>
        </div>
      </div>
    </section>
  );
};

const CategoriesSection = () => {
  const CATEGORIES = [
    { name: 'Books & Music', icon: Book },
    { name: 'Electronics', icon: Smartphone },
    { name: 'Fashion', icon: Shirt },
    { name: 'Home & Garden', icon: House },
    { name: 'Kids & Baby', icon: Baby },
    { name: 'Services', icon: Wrench },
    { name: 'Sports', icon: Dumbbell },
    { name: 'Vehicles', icon: Car },
  ];

  return (
    <section className="container mx-auto px-4 mt-12">
      <h2 className="text-xl font-bold text-foreground mb-6">Browse by Category</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {CATEGORIES.map((cat, i) => (
          <div
            key={i}
            className="flex flex-col items-center min-w-25 cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-accent mb-2 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
              <cat.icon className="w-7 h-7" />
            </div>
            <span className="text-xs font-medium text-muted text-center">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

type LatestProductsProps = {
  searchParams: Record<string, SearchParamValue>;
};

const getSingleSearchParam = (value: SearchParamValue) => {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
};

const parseAdsSearchParams = (searchParams: Record<string, SearchParamValue>) => {
  return {
    query: getSingleSearchParam(searchParams.query) as string,
    order: getSingleSearchParam(searchParams.order) as 'asc' | 'desc',
    page: Number(getSingleSearchParam(searchParams.page)) || 1,
  };
};

const LatestProducts = async ({ searchParams }: LatestProductsProps) => {
  const { query, order, page } = parseAdsSearchParams(searchParams);

  const {
    items: products,
    currentPage,
    totalPages,
  } = await getAdvertisements({ query, order, page, pageSize: PAGE_SIZE });

  return (
    <section className="container mx-auto px-4 mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Latest Products</h2>
        <a
          href="#"
          className="text-accent text-sm font-medium hover:underline flex items-center gap-1"
        >
          View all &rarr;
        </a>
      </div>

      {products.length === 0 ? (
        <p className="text-muted">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </section>
  );
};

export default Home;
