'use client';

import { Bookmark, getFaviconUrl } from '@/lib/bookmarks';
import { cn } from '@/lib/utils';
import { getAccentForBookmark } from '@/lib/bookmark-colors';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { BaseCard } from '@/components/base-card';

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export const BookmarkCard = ({ bookmark }: BookmarkCardProps) => {
  const [faviconError, setFaviconError] = useState(false);
  const faviconUrl = getFaviconUrl(bookmark.url);
  const accentColor = getAccentForBookmark(bookmark.type);

  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-xl focus-visible:ring-2 focus-visible:ring-[var(--accent-violet)] focus-visible:outline-none"
    >
      <BaseCard accentColor={accentColor} className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-main border-border-color flex size-10 shrink-0 items-center justify-center rounded-lg border">
            {!faviconError && faviconUrl ? (
              <Image
                src={faviconUrl}
                alt=""
                width={24}
                height={24}
                className="size-6"
                onError={() => setFaviconError(true)}
                unoptimized
              />
            ) : (
              <ExternalLink className="text-fore/30 size-4" aria-hidden />
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h3 className="text-fore flex items-center gap-2 text-base font-semibold leading-snug tracking-tight">
              <span className="truncate">{bookmark.name}</span>
              <ExternalLink
                aria-hidden
                className={cn(
                  'text-fore/25 size-3.5 shrink-0',
                  'transition-all duration-300 ease-out',
                  'group-hover:text-accent-violet group-focus-visible:text-accent-violet',
                  'motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5',
                  'motion-safe:group-focus-visible:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5',
                )}
              />
            </h3>
            <p className="text-fore/60 line-clamp-2 text-sm leading-relaxed">
              {bookmark.description}
            </p>
          </div>
        </div>

        {bookmark.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {bookmark.tags.map((tag) => (
              <span
                key={tag}
                className="bg-main border-border-color text-fore/50 rounded-md border px-2 py-0.5 text-xs font-medium transition-colors duration-200 group-hover:border-[color-mix(in_oklab,var(--accent)_30%,var(--border-color))] group-focus-visible:border-[color-mix(in_oklab,var(--accent)_30%,var(--border-color))]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </BaseCard>
    </a>
  );
};
