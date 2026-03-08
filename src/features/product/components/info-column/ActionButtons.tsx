import { getSession } from '@/lib/auth';
import { DeleteAdButton } from './DeleteProductButton';
import { EditAdButton } from './EditProductButton';

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
        <EditAdButton />
        <DeleteAdButton adId={adId} />
      </div>
    </div>
  );
};
