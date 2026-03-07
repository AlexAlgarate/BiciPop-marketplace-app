import { SearchBar } from './SearchBar';
import { LogoSection } from './LogoSection';
import { MobileMenu } from './Mobilemenu';
import { AuthSections, AuthSectionsProps } from './AuthSections';

export const Navbar = ({ isAuthenticated }: AuthSectionsProps) => {
  return (
    <nav className="border-b border-border py-3 md:py-4 sticky top-0 bg-background/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4 relative">
        <div className="shrink-0">
          <LogoSection />
        </div>
        {isAuthenticated && <SearchBar />}
        <div className="hidden md:block shrink-0">
          <AuthSections isAuthenticated={isAuthenticated} />
        </div>

        <MobileMenu isAuthenticated={isAuthenticated} />
      </div>
    </nav>
  );
};
