import Link from 'next/link';
import { ThemeToggle } from '../../components/theme-toggle';

const Header = () => {
  const links = [
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Posts',
      href: '/posts',
    },
    {
      label: 'Categories',
      href: '/categories',
    },
  ];
  return (
    <div className="sticky top-0 z-10 flex h-20 items-center justify-around py-4">
      <div className="m-auto flex w-3/4 items-center justify-between">
        <div className="flex items-center gap-4">
          {/* logo */}
          <Link
            href="/"
            className="text-fore text-xl font-semibold transition-transform duration-300 hover:scale-125"
          >
            Akira1ce
          </Link>
        </div>
        {/* nav */}
        <div className="bg-fore/5 flex items-center gap-4 rounded-2xl px-4 py-2 shadow-md backdrop-blur-md">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-fore transition-all hover:underline"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
