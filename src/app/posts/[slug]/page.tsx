import { getAllPosts, getPostBySlug } from '@/lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TableOfContents } from '@/components/table-of-contents';
import { ArrowLeftRight, Split } from 'lucide-react';

export interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.slice(0, 20).map((post) => ({ slug: post.slug }));
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
      <div className="my-20">
        <div className="text-fore mb-4 text-center text-3xl font-bold tracking-tight">
          {matter?.title}
        </div>
        <div className="text-fore/50 mb-4 flex items-center justify-center gap-2 text-sm">
          <div>创建于：{matter?.createdDate}</div>
          <div>|</div>
          <div>更新于：{matter?.updatedDate}</div>
        </div>
        <div className="flex justify-center gap-1">
          {matter?.category.map((item) => (
            <Link
              key={item}
              className="text-fore/60 bg-card border-border-color rounded-xl border px-2 py-1 text-xs transition-colors hover:bg-card-hover"
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
          className="fixed top-40 right-0 hidden max-h-[60vh] w-64 overflow-auto xl:block"
          maxLevel={4}
        />
        <footer className="text-fore/60 gap-2 pt-20 text-center">我也是有底线的 🫠</footer>
      </div>
    </>
  );
}
