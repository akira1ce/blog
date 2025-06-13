export interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const { default: Post } = await import(`@/posts/${slug}.mdx`);

  return <Post />;
}

export function generateStaticParams() {
  return [];
}

// export const dynamicParams = false;
