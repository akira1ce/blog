import { getAllPosts } from '@/lib/posts';
import { FadeInUp } from '@/components/fade-in-up';
import { PostCard } from '@/components/post-card';
import Link from 'next/link';

const Page = async () => {
  const posts = await getAllPosts();
  return (
    <>
      <div className="mt-4 mb-2 text-center text-3xl font-bold tracking-tight">Posts</div>
      <div className="bg-accent-amber mx-auto mb-12 h-0.5 w-16" />
      {/* posts */}
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
};

export default Page;
