import { getCategories } from '@/lib/categories';

import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { CreateAdForm } from './components/CreateProductForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const CreateAdPage = async () => {
  const session = await getSession();

  if (!session?.userId) {
    redirect('/auth/login?callbackUrl=/products/create');
  }

  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Cancelar y volver
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Vende tu bici</h1>
          <p className="text-muted-foreground mt-1">
            Completa los detalles para publicar tu anuncio en BiciPop.
          </p>
        </div>

        <div className="bg-card rounded-xl shadow-sm p-6 md:p-8">
          <CreateAdForm categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default CreateAdPage;
