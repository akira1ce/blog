'use client';

import { Bookmark, BookmarkType } from '@/lib/bookmarks';
import { useMemo, useState } from 'react';
import groupBy from 'lodash/groupBy';
import { BookmarkCard } from './bookmark-card';
import { FadeInUp } from '@/components/fade-in-up';
import { accentByIndex } from '@/lib/colors';
import { cn } from '@/lib/utils';

interface BookmarkFiltersProps {
  bookmarks: Bookmark[];
  types: BookmarkType[];
}

export const BookmarkFilters = ({ bookmarks, types }: BookmarkFiltersProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const grouped = useMemo(() => groupBy(bookmarks, 'typeId'), [bookmarks]);

  const visibleTypes = selectedType ? types.filter((type) => type.id === selectedType) : types;

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
          {types.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={tabClassName(selectedType === type.id)}
            >
              {type.name}
              <span
                className={cn(
                  'ml-1.5 tabular-nums',
                  selectedType === type.id ? 'text-white/80' : 'text-fore/50',
                )}
              >
                {grouped[type.id]?.length ?? 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-12 px-4 pb-12">
        {visibleTypes.map((type, groupIndex) => {
          const sites = grouped[type.id] ?? [];
          const accentColor = accentByIndex(types.findIndex((t) => t.id === type.id));

          return (
            <FadeInUp key={type.id} delay={groupIndex * 0.05}>
              <section>
                <h2 className="text-fore mb-4 flex items-center gap-2 text-xl font-semibold tracking-tight">
                  <span
                    className="size-1.5 shrink-0 rounded-full"
                    style={{ background: `var(--accent-${accentColor})` }}
                    aria-hidden
                  />
                  {type.name}
                  <span className="text-fore/40 ml-1 text-sm font-normal tabular-nums">
                    {sites.length}
                  </span>
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {sites.map((bookmark) => (
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
