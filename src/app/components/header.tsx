import Link from 'next/link';
import { ThemeToggle } from '../../components/theme-toggle';
import GlobalSearch from './global-search';

const Header = () => {
  const links = [
    { label: 'About', href: '/about' },
    { label: 'Posts', href: '/posts' },
    { label: 'Categories', href: '/categories' },
  ];
  return (
    <div className="bg-main/80 sticky top-0 z-10 flex h-16 items-center justify-around backdrop-blur-md border-b border-border-color">
      <div className="m-auto flex w-3/4 items-center justify-between">
        <div className="flex items-center gap-4">
          {/* logo */}
          <Link
            href="/"
            className="text-fore mr-4 text-xl font-bold tracking-tight transition-colors duration-200 hover:text-accent-amber"
          >
            Akira1ce
          </Link>
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-fore/70 transition-colors duration-200 hover:text-fore border-b-2 border-transparent hover:border-accent-amber pb-0.5"
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* nav */}
        <div className="flex items-center gap-3">
          <GlobalSearch />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
