import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import GlobalSearch from './global-search';

const Header = () => {
  const links = [
    { label: 'About', href: '/about' },
    { label: 'Posts', href: '/posts' },
    { label: 'Categories', href: '/categories' },
  ];
  return (
    <header className="bg-main/80 border-border-color sticky top-0 z-10 border-b border-dashed backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="text-fore mr-4 text-lg font-semibold tracking-tight transition-opacity duration-200 hover:opacity-70"
          >
            Akira1ce
          </Link>
          <nav className="flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-fore/60 hover:text-fore rounded-lg px-2.5 py-1.5 text-sm transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <GlobalSearch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
