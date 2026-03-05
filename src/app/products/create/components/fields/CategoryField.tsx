import { Category } from '@/app/products/types';

interface CategorySelectFieldProps {
  categories: Category[];
  error?: string[];
}

export const CategorySelectField = ({
  categories,
  error,
}: CategorySelectFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="categoryId" className="text-sm font-medium text-foreground">
        ¿Qué tipo de bici es?
      </label>

      <div className="relative">
        <select
          id="categoryId"
          name="categoryId"
          className="w-full appearance-none border border-border rounded-lg px-4
            py-2.5 text-sm bg-card text-foreground focus:ring-2 focus:ring-primary/20
            focus:border-primary transition-all cursor-pointer"
          defaultValue=""
        >
          <option value="" disabled hidden>
            Selecciona el estilo (ej: Carretera, MTB...)
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
          <svg
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      {error && <p className="text-red-500 text-xs font-medium mt-1">{error}</p>}

      <p className="text-xs text-muted-foreground">
        {'* Si es una E-bike de montaña, te sugerimos la categoría "Montaña"'}
      </p>
    </div>
  );
};
