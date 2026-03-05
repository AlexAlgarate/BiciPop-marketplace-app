import { Edit2, Trash2 } from 'lucide-react';

export const AdManagementPanel = () => {
  return (
    <div className="mt-4 pt-6 border-t border-border">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
        Administrar Anuncio
      </h4>
      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 border border-border hover:bg-secondary hover:border-gray-400 text-foreground font-medium py-2.5 rounded-lg transition-colors">
          <Edit2 className="w-4 h-4" />
          Editar
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 font-medium py-2.5 rounded-lg transition-colors">
          <Trash2 className="w-4 h-4" />
          Eliminar
        </button>
      </div>
    </div>
  );
};
