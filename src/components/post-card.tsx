import { FrontMatter } from '@/lib/posts';
import { cn } from '@/lib/utils';
import { getAccentForCategory, getAccentBorderClass, getAccentTextClass } from '@/lib/colors';

interface PostCardProps extends React.HTMLAttributes<HTMLDivElement> {
  post: FrontMatter;
  /** 'card' for article listing (full), 'list' for search results (compact) */
  variant?: 'card' | 'list';
}

export const PostCard = ({ post, variant = 'card', className, ...restProps }: PostCardProps) => {
  const accent = getAccentForCategory(
    Array.isArray(post.category) ? post.category[0] : post.category,
  );

  if (variant === 'list') {
    return (
      <div
        className={cn(
          'flex flex-col gap-1 rounded-xl p-3 transition-colors duration-200',
          'hover:bg-card-hover cursor-pointer',
          className,
        )}
        {...restProps}
      >
        <div className="text-fore text-base font-semibold">{post.title}</div>
        <div className="text-fore/50 line-clamp-1 text-sm">{post.summary}</div>
      </div>
    );
  }

  // card variant — editorial style with accent top bar
  return (
    <div
      className={cn(
        'bg-card hover:bg-card-hover border-border-color group relative flex flex-col gap-2 rounded-xl border p-5 transition-all duration-300',
        getAccentBorderClass(accent),
        'border-t border-r border-b border-l',
        className,
      )}
      {...restProps}
    >
      <div className="text-fore text-lg leading-snug font-bold">{post.title}</div>
      <div className="text-fore/55 line-clamp-2 truncate text-sm leading-relaxed">
        {post.summary}
      </div>
      <div className="text-fore/40 flex items-center gap-2 text-xs">
        {Array.isArray(post.category)
          ? post.category.map((cat) => (
              <span key={cat} className={cn('font-medium', getAccentTextClass(accent))}>
                #{cat}
              </span>
            ))
          : null}
        <span className="ml-auto">{post.updatedDate?.slice(0, 10)}</span>
      </div>
    </div>
  );
};
