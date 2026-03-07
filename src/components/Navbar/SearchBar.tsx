'use client';

import { Search, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';

const DEBOUNCE_MS = 400;

export const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [value, setValue] = useState(searchParams.get('query') ?? '');
  const debounce = useRef<ReturnType<typeof setTimeout>>(null);

  const applySearch = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) {
      params.set('query', query.trim());
    } else {
      params.delete('query');
    }

    params.set('page', '1');

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setValue(next);

    if (debounce.current) {
      clearTimeout(debounce.current);
    }

    debounce.current = setTimeout(() => applySearch(next), DEBOUNCE_MS);
  };

  const handleClear = () => {
    setValue('');
    if (debounce.current) {
      clearTimeout(debounce.current);
    }

    applySearch('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (debounce.current) {
        clearTimeout(debounce.current);
      }

      applySearch(value);
    }
  };

  return (
    <div className="flex-1 max-w-2xl relative hidden md:block">
      <input
        key={searchParams.get('query') ?? ''}
        type="text"
        placeholder="Buscar productos..."
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full py-2.5 pl-10 pr-4 bg-secondary text-foreground rounded-full placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
      />
      <Search className="w-4 h-4 text-muted absolute left-3.5 top-3.5" />
      {value && (
        <button
          onClick={handleClear}
          aria-label="Clean search"
          className="absolute right-3.5 top-3 text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4 cursor-pointer" />
        </button>
      )}
    </div>
  );
};
