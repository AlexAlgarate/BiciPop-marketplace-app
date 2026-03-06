import { Button } from '@/components/ui/Button';
import { getSession } from '@/lib/auth/auth';
import { Edit2 } from 'lucide-react';
import { DeleteAdButton } from './DeleteAdButton';

interface Props {
  adId: number;
  ownerId: string;
}

export const AdManagementPanel = async ({ adId, ownerId }: Props) => {
  const session = await getSession();

  if (session?.userId !== ownerId) return null;

  return (
    <div className="mt-4 pt-6 border-t border-border">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
        Administrar Anuncio
      </h4>
      <div className="flex gap-3">
        <Button
          className="flex-1 flex items-center justify-center gap-2
          border border-gary-200 hover:bg-gray-200 hover:border-gray-400
          text-gay-700 font-medium py-2.5 rounded-lg
          dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800
          "
        >
          <Edit2 className="w-4 h-4" />
          Editar
        </Button>
        <DeleteAdButton adId={adId} />
      </div>
    </div>
  );
};
