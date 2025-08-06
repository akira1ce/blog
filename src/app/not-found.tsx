import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col items-center justify-center text-center">
      <div className="mb-8">
        <h1 className="text-fore mb-4 text-6xl font-bold">404</h1>
        <h2 className="text-fore/70 mb-2 text-2xl">Page Not Found</h2>
        <p className="text-fore/50 text-lg">The page you're looking for doesn't exist.</p>
      </div>

      <Link
        href="/"
        className="bg-fore/20 text-fore hover:bg-fore/10 rounded-xl px-6 py-3 font-medium transition-colors duration-200"
      >
        Back to Home
      </Link>
    </div>
  );
}
