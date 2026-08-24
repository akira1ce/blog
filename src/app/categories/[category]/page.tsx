import { getPostsByCategory, getCategories } from '@/lib/posts';
import { PostCard } from '@/app/posts/components/post-card';
import { FadeInUp } from '@/components/fade-in-up';
import Link from 'next/link';

export interface Params {
  category: string;
}

interface Props {
  params: Promise<Params>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    category: category.name,
  }));
}

export const revalidate = 3600;
export const dynamicParams = true;

export default async function Page({ params }: Props) {
  const { category } = await params;
  const posts = await getPostsByCategory(category);

  return (
    <div className="m-auto max-w-4xl">
      <div className="p-8">
        <div className="mb-2 text-center text-3xl font-bold tracking-tight">{category}</div>
        <div className="bg-accent-amber mx-auto h-0.5 w-16" />
      </div>
      <FadeInUp>
        <div className="grid grid-cols-1 gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group rounded-xl focus-visible:ring-2 focus-visible:ring-[var(--accent-sky)] focus-visible:outline-none"
            >
              <PostCard post={post} />
            </Link>
          ))}
        </div>
      </FadeInUp>
    </div>
  );
}
