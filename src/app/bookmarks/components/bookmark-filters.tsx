'use client';

import { BookmarksByType, BookmarkType } from '@/lib/bookmarks';
import { useState, useMemo } from 'react';
import { BookmarkCard } from './bookmark-card';
import { FadeInUp } from '@/components/fade-in-up';
import { cn } from '@/lib/utils';

interface BookmarkFiltersProps {
  bookmarkGroups: BookmarksByType[];
  allTypes: BookmarkType[];
}

export const BookmarkFilters = ({ bookmarkGroups, allTypes }: BookmarkFiltersProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredGroups = useMemo(() => {
    return bookmarkGroups
      .map((group) => {
        // Filter by type if selected
        if (selectedType && group.type.id !== selectedType) {
          return null;
        }

        return group;
      })
      .filter((group): group is BookmarksByType => group !== null);
  }, [bookmarkGroups, selectedType]);

  return (
    <>
      {/* Filter controls */}
      <div className="px-4">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedType(null)}
            className={cn(
              'border-border-color cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200',
              selectedType === null
                ? 'bg-accent-violet border-transparent text-white'
                : 'bg-card text-fore/70 hover:bg-card-hover hover:border-accent-violet/30',
            )}
          >
            全部
          </button>
          {allTypes.map((type) => {
            const count = bookmarkGroups.find((g) => g.type.id === type.id)?.sites.length || 0;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={cn(
                  'border-border-color cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200',
                  selectedType === type.id
                    ? 'bg-accent-violet border-transparent text-white'
                    : 'bg-card text-fore/70 hover:bg-card-hover hover:border-accent-violet/30',
                )}
              >
                {type.name}
                <span
                  className={cn(
                    'ml-1.5 tabular-nums',
                    selectedType === type.id ? 'text-white/80' : 'text-fore/50',
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-12 px-4 pb-12">
        {filteredGroups.map((group, groupIndex) => (
          <FadeInUp key={group.type.id} delay={groupIndex * 0.05}>
            <section>
              <h2 className="text-fore mb-4 flex items-center gap-2 text-xl font-semibold tracking-tight">
                <span className="bg-accent-violet size-1.5 shrink-0 rounded-full" aria-hidden />
                {group.type.name}
                <span className="text-fore/40 ml-1 text-sm font-normal tabular-nums">
                  {group.sites.length}
                </span>
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.sites.map((bookmark) => (
                  <BookmarkCard key={bookmark.id} bookmark={bookmark} />
                ))}
              </div>
            </section>
          </FadeInUp>
        ))}
      </div>
    </>
  );
};
