'use client';

import { CommandDialog } from '@/components/command-dialog';
import { FrontMatter } from '@/lib/posts';
import { ArrowRight, Command, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState<FrontMatter[]>([]);
  const router = useRouter();

  const filteredPosts = useMemo(() => {
    if (!search.length) return posts.slice(0, 10);
    return posts.filter((post) =>
      (post.title + ' ' + post.summary + ' ' + post.slug)
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [posts, search]);

  const handleLink = (slug: string) => {
    setOpen(false);
    router.push(`/posts/${slug}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await fetch('/posts-index.json').then((res) => res.json());
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <div
        className="text-fore/60 bg-fore/10 flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1 text-sm"
        onClick={() => setOpen(true)}
      >
        <Command className="size-3" />K
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="bg-fore/10 mb-4 flex w-full items-center gap-2 rounded-xl px-4 py-2">
          <Search className="text-fore/60 size-4" />
          <input
            className="w-full bg-transparent outline-none"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>
        <div className="flex max-h-[60vh] w-[80vw] flex-col gap-4 overflow-auto pr-4 transition-all sm:w-[60vw] xl:w-[40vw]">
          {filteredPosts.map((post) => (
            <div
              key={post.slug}
              className="group relative flex cursor-pointer items-center justify-between gap-2 p-2 hover:font-semibold"
              onClick={() => handleLink(post.slug)}
            >
              <div>
                <div key={post.slug}>{post.title}</div>
                <div className="text-fore/60 text-sm">{post.summary}</div>
              </div>
              <ArrowRight className="size-4 opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100" />
            </div>
          ))}
          {filteredPosts.length === 0 && (
            <div className="text-fore/60 p-4 text-center text-sm">No posts found</div>
          )}
        </div>
      </CommandDialog>
    </>
  );
};

export default GlobalSearch;
