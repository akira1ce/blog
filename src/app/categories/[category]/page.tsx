import { getPostsByCategory, getCategories } from '@/lib/posts';
import { PostCard } from '@/components/post-card';
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
    <>
      <h1 className="mb-2 text-center text-3xl font-bold tracking-tight">{category}</h1>
      <div className="bg-accent-sky mx-auto mb-12 h-0.5 w-16" />
      <FadeInUp>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <PostCard post={post} />
            </Link>
          ))}
        </div>
      </FadeInUp>
    </>
  );
}
