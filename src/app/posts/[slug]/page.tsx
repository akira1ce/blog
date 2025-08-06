import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';

export interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const revalidate = 3600;
export const dynamicParams = true;

export default async function Page({ params }: Props) {
  const { slug } = await params;

  let Post, matter;

  try {
    matter = await getPostBySlug(slug);
    const mod = await import(`@/contents/${slug}.mdx`);
    Post = mod.default;
  } catch (e) {
    return notFound();
  }

  return (
    <>
      <div className="mb-10">
        <div className="text-fore mb-4 text-center text-3xl font-bold underline">
          {matter?.title}
        </div>
        <div className="text-fore/50 text-center text-sm">{matter?.date}</div>
      </div>
      <article className="prose-custom shiki">
        <Post />
      </article>
    </>
  );
}
