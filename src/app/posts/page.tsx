import { getAllPosts } from '@/lib/posts';
import { FadeInUp } from '@/components/FadeInUp';
import Link from 'next/link';

const Page = () => {
  const posts = getAllPosts();
  return (
    <>
      {/* posts */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.map((post, index) => (
          <FadeInUp
            className="col-span-1 rounded-xl p-4 shadow-md"
            key={post.slug}
            delay={index * 0.1}
          >
            <Link href={`/${post.slug}`}>
              <div className="text-lg font-bold">{post.title}</div>
              <div className="text-sm text-gray-500">{post.summary}</div>
            </Link>
          </FadeInUp>
        ))}
      </div>
    </>
  );
};

export default Page;
