import { getAllPosts } from '@/lib/posts';
import { FadeInUp } from '@/components/fade-in-up';
import { PostLink } from '@/components/post-link';

const Page = () => {
  const posts = getAllPosts();
  return (
    <>
      <div className="mb-12 text-center text-3xl font-bold underline">Posts</div>
      {/* posts */}
      <FadeInUp>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {posts.map((post, index) => (
            <PostLink key={post.slug} post={post} className="col-span-1" />
          ))}
        </div>
      </FadeInUp>
    </>
  );
};

export default Page;
