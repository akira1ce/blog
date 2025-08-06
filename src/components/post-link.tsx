import { FrontMatter } from '@/lib/posts';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const PostCard = ({ post, className }: { post: FrontMatter; className?: string }) => {
  return (
    <Link
      className={cn(
        'bg-fore/10 hover:bg-fore/20 relative flex flex-col gap-2 rounded-xl p-4 shadow transition-all duration-300',
        className,
      )}
      href={`/posts/${post.slug}`}
    >
      <div className="text-fore text-lg font-bold">{post.title}</div>
      <div className="text-fore/50 line-clamp-1 text-sm">{post.summary}</div>
      <div className="flex flex-wrap gap-1">
        {post.category.map((c) => (
          <span key={c} className="text-fore/60 bg-fore/10 rounded-xl px-2 py-1 text-xs">
            #{c}
          </span>
        ))}
      </div>
      <div className="text-fore/50 absolute top-4 right-4 text-end text-sm">{post.date}</div>
    </Link>
  );
};
