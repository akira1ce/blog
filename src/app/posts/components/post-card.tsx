import { FrontMatter } from '@/lib/posts';
import { cn } from '@/lib/utils';
import { CATEGORY_ACCENT } from '@/lib/colors';
import { ArrowUpRight } from 'lucide-react';
import { BaseCard } from '@/components/base-card';

interface PostCardProps extends React.HTMLAttributes<HTMLDivElement> {
  post: FrontMatter;
}

export const PostCard = ({ post, className, style, ...restProps }: PostCardProps) => {
  const categories = Array.isArray(post.category) ? post.category : [post.category];
  const accent = CATEGORY_ACCENT[categories[0]];

  return (
    <BaseCard accentColor={accent} className={className} style={style} {...restProps}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-fore line-clamp-2 text-lg leading-snug font-semibold tracking-tight text-balance">
          {post.title}
        </h3>
        <ArrowUpRight
          aria-hidden
          className={cn(
            'text-fore/25 mt-1 size-4 shrink-0',
            'transition-all duration-300 ease-out',
            'group-hover:[color:var(--accent)] group-focus-visible:[color:var(--accent)]',
            'motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5',
            'motion-safe:group-focus-visible:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5',
          )}
        />
      </div>

      {post.summary ? (
        <p className="text-fore/70 line-clamp-2 text-sm leading-relaxed text-pretty">
          {post.summary}
        </p>
      ) : null}

      <div className="mt-auto flex items-center gap-2 pt-1 text-xs">
        <span
          aria-hidden
          className="size-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: 'var(--accent)' }}
        />
        <span className="text-fore/60 truncate font-medium">{categories.join(' · ')}</span>
        <time className="text-fore/60 ml-auto shrink-0 tabular-nums">
          {post.updatedDate?.slice(0, 10)}
        </time>
      </div>
    </BaseCard>
  );
};
