import { getPostsByCategory } from '@/lib/posts';
import { PostLink } from '@/components/post-link';
import { FadeInUp } from '@/components/fade-in-up';

export interface Params {
  category: string;
}

interface Props {
  params: Promise<Params>;
}

export default async function Page({ params }: Props) {
  const { category } = await params;
  const posts = await getPostsByCategory(category);

  return (
    <div>
      <h1 className="mb-12 text-center text-3xl font-bold underline">{category}</h1>
      <FadeInUp>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <PostLink className="col-span-1" key={post.slug} post={post} />
          ))}
        </div>
      </FadeInUp>
    </div>
  );
}
