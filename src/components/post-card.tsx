import { FrontMatter } from '@/lib/posts';
import { cn } from '@/lib/utils';
import { getAccentForCategory, getAccentBorderClass, getAccentTextClass } from '@/lib/colors';

interface PostCardProps extends React.HTMLAttributes<HTMLDivElement> {
  post: FrontMatter;
}

export const PostCard = ({ post, className, ...restProps }: PostCardProps) => {
  const accent = getAccentForCategory(
    Array.isArray(post.category) ? post.category[0] : post.category,
  );

  return (
    <div
      className={cn(
        'bg-card hover:bg-card-hover group relative flex flex-col gap-2 rounded-xl border border-dashed p-5 transition-all duration-300',
        getAccentBorderClass(accent),
        className,
      )}
      {...restProps}
    >
      <div className="text-fore text-lg leading-snug font-bold">{post.title}</div>
      <div className="text-fore/55 text-sm leading-relaxed">{post.summary}</div>
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
