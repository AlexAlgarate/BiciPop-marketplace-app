import { Button } from '@/components/ui/Button';
import { getSession } from '@/lib/auth';
import { Edit2, Trash2 } from 'lucide-react';
import { deleteAdAction } from '../actions';

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
        <Button className="flex-1 flex items-center justify-center gap-2 border border-border hover:bg-secondary hover:border-gray-400 text-foreground font-medium py-2.5 rounded-lg">
          <Edit2 className="w-4 h-4" />
          Editar
        </Button>
        <form action={deleteAdAction} className="flex-1">
          <input type="hidden" name="adId" value={adId} />
          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2 border border-red-200/40 text-red-500 hover:bg-red-50 font-medium py-2.5 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </Button>
        </form>
      </div>
    </div>
  );
};
