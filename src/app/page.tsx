import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
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

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: 'Vespa Primavera 125cc new',
    price: 3200,
    imageUrl: 'https://picsum.photos/seed/photo-1/400/300',
    category: 'Vehicles',
    location: 'Rome',
    createdAt: '2026-01-01 09:47:33.444',
    description:
      'Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description ',
    likes: 8,
    userName: 'pepito',
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: 'MacBook Pro 14" M3 Pro',
    price: 1800,
    imageUrl: 'https://picsum.photos/seed/photo-1/400/300',
    category: 'Electronics',
    location: 'Barcelona',
    createdAt: '2025-12-01 09:47:33.444',
    description: 'eoquweoqiuweoqiuewoqiwue',
    likes: 8,
    userName: 'pepito',
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: 'Professional Photography Services',
    price: 100,
    imageUrl: 'https://picsum.photos/seed/photo-1/400/300',
    category: 'Services',
    location: 'Madrid',
    createdAt: '2026-02-01 09:47:33.444',
    description: 'eoquweoqiuweoqiuewoqiwue',
    likes: 8,
    userName: 'pepito',
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: 'Baby Stroller - Bugaboo Fox',
    price: 400,
    imageUrl: 'https://picsum.photos/seed/photo-1/400/300',
    category: 'Kids & Baby',
    location: 'Malaga',
    createdAt: new Date(),
    description: 'eoquweoqiuweoqiuewoqiwue',
    likes: 8,
    userName: 'pepito',
    updatedAt: new Date(),
  },
  {
    id: 5,
    title: 'Baby Stroller - Bugaboo Fox',
    price: 400,
    imageUrl: 'https://picsum.photos/seed/photo-1/400/300',
    category: 'Kids & Baby',
    location: 'Malaga',
    createdAt: new Date(),
    description: 'eoquweoqiuweoqiuewoqiwue',
    likes: 8,
    userName: 'pepito',
    updatedAt: new Date(),
  },
  {
    id: 6,
    title: 'Baby Stroller - Bugaboo Fox',
    price: 400,
    imageUrl: 'https://picsum.photos/seed/photo-1/400/300',
    category: 'Kids & Baby',
    location: 'Malaga',
    createdAt: new Date(),
    description: 'eoquweoqiuweoqiuewoqiwue',
    likes: 8,
    userName: 'pepito',
    updatedAt: new Date(),
  },
  {
    id: 7,
    title: 'Baby Stroller - Bugaboo Fox',
    price: 400,
    imageUrl: 'https://picsum.photos/seed/photo-1/400/300',
    category: 'Kids & Baby',
    location: 'Malaga',
    createdAt: new Date(),
    description: 'eoquweoqiuweoqiuewoqiwue',
    likes: 8,
    userName: 'pepito',
    updatedAt: new Date(),
  },
  {
    id: 8,
    title: 'Baby Stroller - Bugaboo Fox',
    price: 400,
    imageUrl: 'https://picsum.photos/seed/photo-1/400/300',
    category: 'Kids & Baby',
    location: 'Malaga',
    createdAt: new Date(),
    description: 'eoquweoqiuweoqiuewoqiwue',
    likes: 8,
    userName: 'pepito',
    updatedAt: new Date(),
  },
  {
    id: 9,
    title: 'Baby Stroller - Bugaboo Fox',
    price: 400,
    imageUrl: 'https://picsum.photos/seed/photo-1/400/300',
    category: 'Kids & Baby',
    location: 'Malaga',
    createdAt: new Date(),
    description: 'eoquweoqiuweoqiuewoqiwue',
    likes: 8,
    userName: 'pepito',
    updatedAt: new Date(),
  },
];

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

export const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pb-20">
        <HeroSection />
        <CategoriesSection />
        <LatestProducts />
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

const LatestProducts = () => {
  // TODO await getProducts()
  const products = MOCK_PRODUCTS;

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
export default Home;
