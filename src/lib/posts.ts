import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'src/contents');

export interface FrontMatter {
  title: string;
  category: string | string[];
  slug: string;
  date: Date;
  summary: string;
}

// 缓存相关变量
let cachedPosts: FrontMatter[] | null = null;
let lastCacheTime = 0;
let lastModTime = 0;

// 缓存有效期（开发环境短一些，生产环境长一些）
const CACHE_TTL = process.env.NODE_ENV === 'development' ? 1000 : 300000;

/* 异步解析mdx文件 */
const getMatter = async (file: string): Promise<FrontMatter> => {
  const raw = await fs.promises.readFile(path.join(POSTS_DIR, file), 'utf-8');
  const { data } = matter(raw);
  return {
    ...(data as FrontMatter),
  };
};

// 异步获取posts目录的最后修改时间
const getPostsDirModTime = async (): Promise<number> => {
  try {
    const stats = await fs.promises.stat(POSTS_DIR);
    return stats.mtime.getTime();
  } catch {
    return 0;
  }
};

// 同步版本（用于快速检查）
const getPostsDirModTimeSync = (): number => {
  try {
    const stats = fs.statSync(POSTS_DIR);
    return stats.mtime.getTime();
  } catch {
    return 0;
  }
};

// 检查缓存是否有效
const isCacheValid = (): boolean => {
  const now = Date.now();
  const currentModTime = getPostsDirModTimeSync();

  return cachedPosts !== null && now - lastCacheTime < CACHE_TTL && currentModTime === lastModTime;
};

// 刷新缓存 - 优化为并行处理
const refreshCache = async (): Promise<FrontMatter[]> => {
  try {
    const files = await fs.promises.readdir(POSTS_DIR);
    const mdxFiles = files.filter((file) => file.endsWith('.mdx'));
    
    // 并行读取所有文件
    const posts = await Promise.all(
      mdxFiles.map(file => getMatter(file))
    );
    
    // 按日期排序
    const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    cachedPosts = sortedPosts;
    lastCacheTime = Date.now();
    lastModTime = await getPostsDirModTime();

    return sortedPosts;
  } catch (error) {
    console.error('Error refreshing cache:', error);
    return [];
  }
};

/* 获取所有文章 */
export async function getAllPosts(): Promise<FrontMatter[]> {
  if (isCacheValid()) return cachedPosts!;

  return await refreshCache();
}

// 手动清除缓存的函数（在需要时可以调用）
export function clearPostsCache(): void {
  cachedPosts = null;
  lastCacheTime = 0;
  lastModTime = 0;
}

/* 获取单篇文章 */
export async function getPostBySlug(slug: string) {
  const posts = await getAllPosts(); // 利用缓存
  return posts.find((post) => post.slug === slug) || null;
}

/* 获取所有分类 */
export async function getCategories() {
  const posts = await getAllPosts(); // 利用缓存
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
  const posts = await getAllPosts(); // 利用缓存
  return posts.filter((p) => {
    const categories = Array.isArray(p.category) ? p.category : [p.category];
    return categories.includes(category);
  });
}
