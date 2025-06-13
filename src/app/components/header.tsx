import Link from 'next/link';

const Header = () => {
  return (
    <div className="sticky top-0 z-10 flex h-24 items-center justify-around bg-white/70 py-4 backdrop-blur-md">
      <div className="m-auto flex w-3/4 items-center justify-between">
        <div className="flex items-center gap-4">
          {/* logo */}
          <Link href="/">Akira1ce</Link>
          {/* nav */}
          <div className="flex items-center gap-4">
            <Link href="/about">About</Link>
            <Link href="/posts">Posts</Link>
          </div>
        </div>
        {/* tools */}
        <div></div>
      </div>
    </div>
  );
};

export default Header;
