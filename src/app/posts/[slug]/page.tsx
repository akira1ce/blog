import { getAllPosts, getPostBySlug } from '@/lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TableOfContents } from '@/components/table-of-contents';

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
        <div className="text-fore/50 mb-4 text-center text-sm">{matter?.date}</div>
        <div className="flex justify-center gap-1">
          {matter?.category.map((item) => (
            <Link
              key={item}
              className="text-fore/60 bg-fore/10 rounded-xl px-2 py-1 text-xs"
              href={`/categories/${item}`}
            >
              #{item}
            </Link>
          ))}
        </div>
      </div>
      <div className="relative">
        <article className="prose-custom shiki">
          <Post />
        </article>
        <TableOfContents
          className="fixed top-40 right-10 hidden max-h-[60vh] w-64 overflow-auto xl:block"
          maxLevel={4}
        />
        <div className="h-100">footer</div>
      </div>
    </>
  );
}
