'use client';

import { logout } from '@/features/auth/actions';
import { LayoutList, LogOut, Menu, Search, Settings, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SearchBar } from './SearchBar';
import Link from 'next/link';

interface MobileMenuProps {
  isAuthenticated: boolean;
}

export const MobileMenu = ({ isAuthenticated }: MobileMenuProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  if (!isAuthenticated) {
    return (
      <div className="md:hidden shrink-0">
        <Link
          href="/auth/login"
          className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          Iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2 md:hidden">
        <button
          onClick={() => {
            setSearchOpen((o) => !o);
            setMenuOpen(false);
          }}
          aria-label="Buscar"
          className="p-2 rounded-full hover:bg-secondary transition-colors text-foreground"
        >
          {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
        </button>

        <button
          onClick={() => {
            setMenuOpen((o) => !o);
            setSearchOpen(false);
          }}
          aria-label="Menú"
          className="p-2 rounded-full hover:bg-secondary transition-colors text-foreground"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {searchOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 px-4 py-3 bg-background/95 backdrop-blur-md border-b border-border shadow-md">
          <div className="relative">
            <SearchBar mobileOpen />
          </div>
        </div>
      )}

      {menuOpen && (
        <>
          <div className="md:hidden fixed inset-0 top-14.25 bg-black/40 z-40" />

          <div
            ref={menuRef}
            className="md:hidden absolute top-full right-0 left-0 z-50 bg-background border-b border-border shadow-xl"
          >
            <div className="container mx-auto px-4 py-2">
              {isAuthenticated ? (
                <>
                  <nav className="flex flex-col">
                    <Link
                      href="/products/my-ads"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-3.5 rounded-lg hover:bg-secondary transition-colors text-foreground font-medium"
                    >
                      <LayoutList className="w-5 h-5 text-muted-foreground shrink-0" />
                      Mis anuncios
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-3.5 rounded-lg hover:bg-secondary transition-colors text-foreground font-medium"
                    >
                      <Settings className="w-5 h-5 text-muted-foreground shrink-0" />
                      Configuración
                    </Link>
                  </nav>

                  <div className="border-t border-border mt-2 pt-2 pb-1">
                    <form action={logout}>
                      <button
                        type="submit"
                        className="w-full flex items-center gap-3 px-3 py-3.5 rounded-lg hover:bg-red-500/10 transition-colors text-red-600 font-medium"
                      >
                        <LogOut className="w-5 h-5 shrink-0" />
                        Cerrar sesión
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="py-2">
                  <a
                    href="/auth/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 rounded-lg transition-colors"
                  >
                    Iniciar sesión
                  </a>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
