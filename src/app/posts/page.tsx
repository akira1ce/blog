import { getAllPosts } from '@/lib/posts';
import { FadeInUp } from '@/components/fade-in-up';
import { PostCard } from '@/components/post-card';
import Link from 'next/link';

const Page = async () => {
  const posts = await getAllPosts();
  return (
    <>
      <div className="mb-12 text-center text-3xl font-bold underline">Posts</div>
      {/* posts */}
      <FadeInUp>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <PostCard post={post} className="bg-fore/5 hover:bg-fore/10 col-span-1" />
            </Link>
          ))}
        </div>
      </FadeInUp>
    </>
  );
};

export default Page;
