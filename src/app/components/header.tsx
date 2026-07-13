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
    <div className="bg-main/80 border-border-color sticky top-0 z-10 flex h-16 items-center justify-around border-b backdrop-blur-md">
      <div className="m-auto flex w-3/5 items-center justify-between">
        <div className="flex items-center gap-4">
          {/* logo */}
          <Link
            href="/"
            className="text-fore hover:text-accent-amber mr-4 text-xl font-bold tracking-tight transition-colors duration-200"
          >
            Akira1ce
          </Link>
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-fore/70 hover:text-fore hover:border-accent-amber border-b-2 border-transparent pb-0.5 transition-colors duration-200"
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
