import { getBookmarksByType } from '@/lib/bookmarks';
import { FadeInUp } from '@/components/fade-in-up';
import { BookmarkCard } from './components/bookmark-card';

const Page = async () => {
  const bookmarkGroups = getBookmarksByType();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="p-8">
        <div className="mb-2 text-center text-3xl font-bold tracking-tight">Bookmarks</div>
        <div className="bg-accent-violet mx-auto h-0.5 w-16" />
      </div>

      <div className="space-y-12 px-4 pb-12">
        {bookmarkGroups.map((group, groupIndex) => (
          <FadeInUp key={group.type.id} delay={groupIndex * 0.1}>
            <section>
              <h2 className="text-fore mb-4 flex items-center gap-2 text-xl font-semibold tracking-tight">
                <span className="bg-accent-violet size-1.5 shrink-0 rounded-full" aria-hidden />
                {group.type.name}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {group.sites.map((bookmark) => (
                  <BookmarkCard key={bookmark.id} bookmark={bookmark} />
                ))}
              </div>
            </section>
          </FadeInUp>
        ))}
      </div>
    </div>
  );
};

export default Page;
