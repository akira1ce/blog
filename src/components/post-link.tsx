import { FrontMatter } from '@/lib/posts';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export const PostCard = ({ post, className }: { post: FrontMatter; className?: string }) => {
  return (
    <Link
      className={cn(
        'bg-fore/5 hover:bg-fore/10 group relative flex flex-col gap-2 rounded-xl p-4 shadow transition-all duration-300',
        className,
      )}
      href={`/posts/${post.slug}`}
    >
      <div className="text-fore text-lg font-bold">{post.title}</div>
      <div className="text-fore/50 line-clamp-1 text-sm">{post.summary}</div>
      <ArrowRight className="text-fore/50 absolute top-4 right-8 size-4 opacity-0 transition-all group-hover:right-4 group-hover:scale-110 group-hover:opacity-100" />
    </Link>
  );
};
