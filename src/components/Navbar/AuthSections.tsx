import Link from 'next/link';
import { ThemeToggle } from '../theme-toggle';
import { Button } from '../ui/Button';
import { logout } from '@/app/auth/actions';

export interface AuthSectionsProps {
  isAuthenticated: boolean;
}
export const AuthSections = ({ isAuthenticated }: AuthSectionsProps) => {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      <ThemeToggle />
      {!isAuthenticated ? (
        <>
          <Link
            href="/auth/login"
            className="
            bg-primary hover:bg-primary/90 text-primary-foreground 
            text-sm font-medium px-4 py-2 rounded-lg cursor-pointer
            transition-colors shadow-sm
            "
          >
            Iniciar sesión
          </Link>
        </>
      ) : (
        <form action={logout}>
          <Button
            className="
            flex-1 flex items-center justify-center border border-red-800
            gap-2 text-red-600 hover:bg-red-700 hover:text-white
          dark:hover:bg-red-700 dark:hover:text-white font-medium py-2.5 rounded-lg
            "
            type="submit"
          >
            Cerrar sesión
          </Button>
        </form>
      )}
    </div>
  );
};
