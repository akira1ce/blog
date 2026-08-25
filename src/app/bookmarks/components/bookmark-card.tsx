'use client';

import { Bookmark, getFaviconUrl } from '@/lib/bookmarks';
import { cn } from '@/lib/utils';
import { AccentColor } from '@/lib/colors';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { BaseCard } from '@/components/base-card';

interface BookmarkCardProps {
  bookmark: Bookmark;
  accentColor?: AccentColor;
}

export const BookmarkCard = ({ bookmark, accentColor }: BookmarkCardProps) => {
  const [faviconError, setFaviconError] = useState(false);
  const faviconUrl = getFaviconUrl(bookmark.url);

  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-xl focus-visible:ring-2 focus-visible:outline-none"
    >
      <BaseCard accentColor={accentColor} className="p-4">
        <div className="flex items-center gap-3">
          <div className="bg-main border-border-color flex size-10 shrink-0 items-center justify-center rounded-lg border">
            {!faviconError && faviconUrl ? (
              <img
                src={faviconUrl}
                alt=""
                width={24}
                height={24}
                className="size-6"
                onError={() => setFaviconError(true)}
              />
            ) : (
              <ExternalLink className="text-fore/30 size-4" aria-hidden />
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <h3 className="text-fore flex items-center gap-2 text-base leading-snug font-semibold tracking-tight">
              <span className="truncate">{bookmark.name}</span>
              <ExternalLink
                aria-hidden
                className={cn(
                  'text-fore/25 size-3.5 shrink-0',
                  'transition-all duration-300 ease-out',
                  'group-hover:[color:var(--accent)] group-focus-visible:[color:var(--accent)]',
                  'motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5',
                  'motion-safe:group-focus-visible:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5',
                )}
              />
            </h3>
            {bookmark.subType && (
              <p className="text-fore/45 truncate font-mono text-xs">{bookmark.subType}</p>
            )}
          </div>
        </div>
      </BaseCard>
    </a>
  );
};
