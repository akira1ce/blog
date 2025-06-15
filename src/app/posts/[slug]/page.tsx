import { getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';

export interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  let Post;

  try {
    const mod = await import(`@/posts/${slug}.mdx`);
    Post = mod.default;
  } catch (e) {
    return notFound();
  }

  const matter = getPostBySlug(slug);

  return (
    <>
      <div className="mb-10">
        <div className="text-fore mb-4 text-center text-3xl font-bold underline">
          {matter?.title}
        </div>
        <div className="text-fore/50 text-center text-sm">{matter?.date.toLocaleDateString()}</div>
      </div>
      <article className="prose dark:prose-invert prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-h5:text-sm prose-h6:text-xs mx-auto max-w-4xl px-6 py-8">
        <Post />
      </article>
    </>
  );
}

// export const dynamicParams = false;
