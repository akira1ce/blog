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
    <div className="bg-main sticky top-0 z-10 flex h-20 items-center justify-around">
      <div className="m-auto flex w-3/4 items-center justify-between">
        <div className="flex items-center gap-4">
          {/* logo */}
          <Link
            href="/"
            className="text-fore mr-4 text-xl font-semibold transition-transform duration-300 hover:scale-125"
          >
            Akira1ce
          </Link>
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-fore transition-all hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* nav */}
        <div className="flex items-center gap-4 rounded-2xl px-4 py-2">
          <GlobalSearch />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
