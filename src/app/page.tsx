import { FadeInUp } from '@/components/fade-in-up';
import { PostCard } from '@/components/post-card';
import { ProjectCard } from '@/components/project-card';
import { getAllPosts } from '@/lib/posts';
import { projects } from '@/lib/projects';
import Image from 'next/image';
import Link from 'next/link';

const Page = async () => {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="space-y-24 py-16">
      {/* ─── Section 1: Hero ─── */}
      <FadeInUp>
        <section className="space-y-8">
          <div className="flex items-center gap-6">
            <Image
              className="rounded-full"
              src="/avatar.jpg"
              alt="Akira1ce"
              width={100}
              height={100}
            />
            <div>
              <h1 className="text-fore text-4xl font-bold tracking-tight">Akira1ce</h1>
              <p className="text-fore/60 mt-1 text-lg">
                <span className="text-accent-sky font-medium">Web Developer</span>
                <span className="mx-2">·</span>
                <span className="text-accent-violet font-medium">Lifelong Learner</span>
                <span className="mx-2">·</span>
                <span className="text-accent-amber font-medium">CS Enthusiast</span>
              </p>
            </div>
          </div>

          {/* Decorative rule */}
          <div className="bg-accent-amber h-px w-24" />

          <p className="text-fore/70 max-w-2xl text-base leading-relaxed">
            I&apos;m a web developer passionate about building delightful user experiences.
            I enjoy exploring the boundaries of frontend technology, writing clean code, and
            sharing what I learn along the way.
          </p>
        </section>
      </FadeInUp>

      {/* ─── Section 2: Recent Posts ─── */}
      {recentPosts.length > 0 && (
        <FadeInUp delay={0.3}>
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-fore/40 text-xs font-semibold tracking-widest uppercase">
                Recent Writing
              </span>
              <div className="bg-border-color h-px flex-1" />
              <Link
                href="/posts"
                className="text-accent-sky text-xs font-medium transition-colors hover:underline"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {recentPosts.map((post) => (
                <Link key={post.slug} href={`/posts/${post.slug}`}>
                  <PostCard post={post} />
                </Link>
              ))}
            </div>
          </section>
        </FadeInUp>
      )}

      {/* ─── Section 3: Projects ─── */}
      <FadeInUp delay={0.5}>
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-fore/40 text-xs font-semibold tracking-widest uppercase">
              Open Source
            </span>
            <div className="bg-border-color h-px flex-1" />
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </section>
      </FadeInUp>
    </div>
  );
};

export default Page;
