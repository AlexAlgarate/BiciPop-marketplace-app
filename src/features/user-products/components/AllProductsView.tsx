import { HeroSectionUser } from './HeroSectionUser';

export const AllProductsView = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pb-20 space-y-12">
      <HeroSectionUser />

      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground tracking-tight mb-8">
          Mis anuncios
        </h2>
        {children}
      </section>
    </div>
  );
};
