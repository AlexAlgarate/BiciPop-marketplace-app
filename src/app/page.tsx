import Link from 'next/link';

export const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <h1 className="pb-20">Página de compraventa de productos</h1>
      <div>
        <h2>Si ya has iniciado sesión puedes ir a la página de productos</h2>
        <Link
          href="/products"
          className="text-orange-500 font-bold text-2xl hover:underline"
        >
          Página de productos
        </Link>
      </div>
    </div>
  );
};

export default Home;
