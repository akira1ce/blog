import fs from 'fs';
import path from 'path';

const POSTS_INDEX_PATH = path.join(process.cwd(), 'public/posts-index.json');

export interface FrontMatter {
  title: string;
  category: string[];
  slug: string;
  date: string;
  summary: string;
}

// 获取所有文章
export async function getAllPosts(): Promise<FrontMatter[]> {
  try {
    const indexContent = await fs.promises.readFile(POSTS_INDEX_PATH, 'utf-8');
    const posts = JSON.parse(indexContent);
    return posts;
  } catch (error) {
    console.error('Error loading posts from index:', error);
    return [];
  }
}

/* 获取单篇文章 */
export async function getPostBySlug(slug: string) {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

/* 获取所有分类 */
export async function getCategories() {
  const posts = await getAllPosts();
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
export async function getPostsByCategory(category: string) {
  const posts = await getAllPosts();
  return posts.filter((p) => {
    const categories = Array.isArray(p.category) ? p.category : [p.category];
    return categories.includes(category);
  });
}
