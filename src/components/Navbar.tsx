import Link from 'next/link';
import { Search } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="border-b border-border py-4 sticky top-0 bg-background z-50">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4">
        <LogoSection />
        <SearchBar />
        <AuthSections />
      </div>
    </nav>
  );
};

const LogoSection = () => {
  return (
    <Link
      href="/"
      className="text-2xl font-bold text-foreground flex items-center gap-2"
    >
      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
        M
      </div>
      MarketHub
    </Link>
  );
};

const SearchBar = () => {
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

const AuthSections = () => {
  return (
    <div className="flex items-center gap-4">
      <button className="hidden sm:block text-muted hover:text-foreground font-medium cursor-pointer">
        Login
      </button>
      <button className="bg-primary hover:bg-primary-hover text-primary-foreground px-5 py-2 rounded-full cursor-pointer font-medium transition-colors">
        Register
      </button>
    </div>
  );
};
