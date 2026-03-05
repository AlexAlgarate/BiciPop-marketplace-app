import Link from 'next/link';
import { ThemeToggle } from '../theme-toggle';
import { logout } from '@/app/auth/logout/route';
import { Button } from '../ui/Button';

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
            className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg cursor-pointer transition-colors shadow-sm"
          >
            Register
          </Link>
        </>
      ) : (
        <form action={logout}>
          <Button
            className="flex-1 flex items-center justify-center border border-border gap-2 text-red-600 hover:bg-red-100/90 font-medium py-2.5 rounded-lg"
            type="submit"
          >
            Cerrar sesión
          </Button>
        </form>
      )}
    </div>
  );
};
