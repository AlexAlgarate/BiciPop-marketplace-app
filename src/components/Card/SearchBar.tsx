import { Search } from 'lucide-react';

export const SearchBar = () => {
  return (
    <div className="flex-1 max-w-2xl relative hidden md:block">
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full py-2.5 pl-10 pr-4 bg-secondary text-foreground rounded-full placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
      />
      <Search className="w-4 h-4 text-muted absolute left-3.5 top-3.5" />
    </div>
  );
};
