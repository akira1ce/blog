import { FrontMatter } from '@/lib/posts';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const PostLink = ({ post, className }: { post: FrontMatter; className?: string }) => {
  return (
    <Link
      className={cn(
        'bg-card flex flex-col gap-2 rounded-xl p-4 shadow transition-all duration-300 hover:scale-95',
        className,
      )}
      href={`/posts/${post.slug}`}
    >
      <div className="text-fore text-lg font-bold">{post.title}</div>
      <div className="text-fore/50 text-sm">{post.summary}</div>
    </Link>
  );
};
