'use client';

import { BookmarksByType } from '@/lib/bookmarks';
import { useState } from 'react';
import { BookmarkCard } from './bookmark-card';
import { FadeInUp } from '@/components/fade-in-up';
import { accentByIndex } from '@/lib/colors';
import { cn } from '@/lib/utils';

interface BookmarkFiltersProps {
  bookmarkGroups: BookmarksByType[];
}

export const BookmarkFilters = ({ bookmarkGroups }: BookmarkFiltersProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredGroups = selectedType
    ? bookmarkGroups.filter((group) => group.type.id === selectedType)
    : bookmarkGroups;

  const tabClassName = (active: boolean) =>
    cn(
      'border-border-color cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200',
      active
        ? 'bg-accent-violet border-transparent text-white'
        : 'bg-card text-fore/70 hover:bg-card-hover hover:border-accent-violet/30',
    );

  return (
    <>
      {/* Filter controls */}
      <div className="px-4">
        <div className="flex flex-wrap justify-center gap-2">
          <button onClick={() => setSelectedType(null)} className={tabClassName(!selectedType)}>
            全部
          </button>
          {bookmarkGroups.map((group) => (
            <button
              key={group.type.id}
              onClick={() => setSelectedType(group.type.id)}
              className={tabClassName(selectedType === group.type.id)}
            >
              {group.type.name}
              <span
                className={cn(
                  'ml-1.5 tabular-nums',
                  selectedType === group.type.id ? 'text-white/80' : 'text-fore/50',
                )}
              >
                {group.sites.length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-12 px-4 pb-12">
        {filteredGroups.map((group, groupIndex) => {
          const accentColor = accentByIndex(
            bookmarkGroups.findIndex((g) => g.type.id === group.type.id),
          );

          return (
            <FadeInUp key={group.type.id} delay={groupIndex * 0.05}>
              <section>
                <h2 className="text-fore mb-4 flex items-center gap-2 text-xl font-semibold tracking-tight">
                  <span
                    className="size-1.5 shrink-0 rounded-full"
                    style={{ background: `var(--accent-${accentColor})` }}
                    aria-hidden
                  />
                  {group.type.name}
                  <span className="text-fore/40 ml-1 text-sm font-normal tabular-nums">
                    {group.sites.length}
                  </span>
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {group.sites.map((bookmark) => (
                    <BookmarkCard key={bookmark.id} bookmark={bookmark} accentColor={accentColor} />
                  ))}
                </div>
              </section>
            </FadeInUp>
          );
        })}
      </div>
    </>
  );
};
