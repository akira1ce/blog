export interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const { default: Post } = await import(`@/posts/${slug}.mdx`);

  return (
    <article className="prose dark:prose-invert mx-auto max-w-4xl px-6 py-8">
      <Post />
    </article>
  );
}

// export const dynamicParams = false;
