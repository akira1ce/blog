import { getAllPosts } from '@/lib/posts';
import { FadeInUp } from '@/components/FadeInUp';
import Link from 'next/link';

const Page = () => {
  const posts = getAllPosts();
  return (
    <>
      <div className="mb-12 text-center text-3xl font-bold">Posts</div>
      {/* posts */}
      <FadeInUp>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              className="bg-card col-span-1 flex flex-col gap-2 rounded-xl p-4 shadow"
              href={`/${post.slug}`}
            >
              <div className="text-fore text-lg font-bold">{post.title}</div>
              <div className="text-fore/50 text-sm">{post.summary}</div>
            </Link>
          ))}
        </div>
      </FadeInUp>
    </>
  );
};

export default Page;
