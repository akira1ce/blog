import { FadeInUp } from '@/components/fade-in-up';
import { PostCard } from '@/components/post-card';
import { getAllPosts } from '@/lib/posts';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Page = async () => {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="space-y-28 py-20 md:py-28">
      {/* ─── Hero ─── */}
      <FadeInUp>
        <section className="space-y-8">
          <Image className="rounded-full" src="/avatar.jpg" alt="Akira1ce" width={72} height={72} />

          <div className="space-y-5">
            <h1 className="text-fore text-5xl font-bold tracking-tight md:text-6xl">Akira1ce</h1>
            <p className="text-fore/70 max-w-xl text-lg leading-relaxed">
              Web Developer <span className="text-fore/30 mx-1">/</span> Lifelong Learner{' '}
              <span className="text-fore/30 mx-1">/</span> CS Enthusiast
            </p>
            <p className="text-fore/50 max-w-xl leading-relaxed">
              I enjoy exploring the boundaries of frontend technology, writing clean code, and
              sharing what I learn along the way.
            </p>
          </div>
        </section>
      </FadeInUp>

      {/* ─── Recent Posts ─── */}
      {recentPosts.length > 0 && (
        <FadeInUp delay={0.15}>
          <section className="space-y-2">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="text-fore/40 text-xs font-semibold tracking-[0.2em] uppercase">
                Recent Writing
              </h2>
              <Link
                href="/posts"
                className="text-accent-sky group text-xs font-medium transition-colors"
              >
                View all
                <ArrowRight className="ml-2 inline-block size-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="group rounded-xl focus-visible:ring-2 focus-visible:ring-[var(--accent-sky)] focus-visible:outline-none"
                >
                  <PostCard post={post} />
                </Link>
              ))}
            </div>
          </section>
        </FadeInUp>
      )}
    </div>
  );
};

export default Page;
