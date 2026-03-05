import { getCategories } from '@/lib/categories';

import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { CreateAdForm } from '../components/CreateAdForm';

const CreateAdPage = async () => {
  const session = await getSession();
  if (!session?.userId) {
    redirect('/auth/login');
  }

  const categories = await getCategories();

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Publicar anuncio</h1>
      <CreateAdForm categories={categories} />
    </div>
  );
};

export default CreateAdPage;
