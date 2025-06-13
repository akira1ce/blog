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
            className="bg-card col-span-1 rounded-xl shadow"
            key={post.slug}
            delay={index * 0.1}
          >
            <Link className="flex flex-col gap-2 p-4" href={`/${post.slug}`}>
              <div className="text-fore text-lg font-bold">{post.title}</div>
              <div className="text-fore/50 text-sm">{post.summary}</div>
            </Link>
          </FadeInUp>
        ))}
      </div>
    </>
  );
};

export default Page;
