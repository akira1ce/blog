import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'src/posts');

export interface FrontMatter {
  title: string;
  category: string | string[];
  slug: string;
  date: Date;
  summary: string;
}

const getMatter = (file: string) => {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
  const { data } = matter(raw);
  return {
    ...(data as FrontMatter),
  };
};

/* 获取所有文章 */
export function getAllPosts(): FrontMatter[] {
  const files = fs.readdirSync(POSTS_DIR);
  return files
    .map((file) => getMatter(file))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/* 获取单篇文章 */
export function getPostBySlug(slug: string) {
  const files = fs.readdirSync(POSTS_DIR);
  const file = files.find((file) => file === `${slug}.mdx`);
  if (!file) {
    return null;
  }
  return getMatter(file);
}

/* 获取所有分类 */
export function getCategories() {
  const posts = getAllPosts();
  const categoryCount: { [key: string]: number } = {};

  posts.forEach((post) => {
    const categories = Array.isArray(post.category) ? post.category : [post.category];
    categories.forEach((category) => {
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
  });

  return Object.keys(categoryCount)
    .sort()
    .map((category) => ({
      name: category,
      count: categoryCount[category],
    }));
}

/* 根据分类获取文章 */
export function getPostsByCategory(category: string) {
  const posts = getAllPosts();
  return posts.filter((p) => p.category.includes(category));
}
