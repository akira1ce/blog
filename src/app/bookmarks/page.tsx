import { getBookmarksByType } from '@/lib/bookmarks';
import { BookmarkFilters } from './components/bookmark-filters';

export const revalidate = 3600;

const Page = async () => {
  const bookmarkGroups = await getBookmarksByType();

  return (
    <div className="mx-auto max-w-6xl">
      <div className="p-8">
        <div className="mb-2 text-center text-3xl font-bold tracking-tight">Bookmarks</div>
        <div className="bg-accent-violet mx-auto h-0.5 w-16" />
      </div>

      <div className="space-y-6">
        <BookmarkFilters bookmarkGroups={bookmarkGroups} />
      </div>
    </div>
  );
};

export default Page;
