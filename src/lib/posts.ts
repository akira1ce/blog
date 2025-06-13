import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'src/posts');

export interface FrontMatter {
  title: string;
  category: string | string[];
  slug: string;
  date: string;
  summary: string;
}

let _cache: FrontMatter[] | null = null;

export function getAllPosts(): FrontMatter[] {
  if (_cache) return _cache;

  const files = fs.readdirSync(POSTS_DIR);
  _cache = files.map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
    const { data } = matter(raw);
    return {
      ...(data as FrontMatter),
    };
  });

  return _cache;
}

/* 获取所有分类 */
export function getCategories() {
  const posts = getAllPosts();
  return [...new Set(posts.map((p) => p.category).flat())];
}

/* 根据分类获取文章 */
export function getPostsByCategory(category: string) {
  const posts = getAllPosts();
  return posts.filter((p) => p.category.includes(category));
}
