import Link from 'next/link';
import { ThemeToggle } from '../../components/theme-toggle';

const Header = () => {
  return (
    <div className="bg-main/60 sticky top-0 z-10 flex h-20 items-center justify-around py-4 backdrop-blur-md">
      <div className="m-auto flex w-3/4 items-center justify-between">
        <div className="flex items-center gap-4">
          {/* logo */}
          <Link
            href="/"
            className="text-fore text-xl font-semibold transition-transform duration-300 hover:scale-125"
          >
            Akira1ce
          </Link>
          {/* nav */}
        </div>
        {/* tools */}
        <div className="flex items-center gap-4">
          <Link href="/about" className="text-fore">
            About
          </Link>
          <Link href="/posts" className="text-fore">
            Posts
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
