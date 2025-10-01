import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import dayjs from 'dayjs';

const POSTS_DIR = path.join(process.cwd(), 'src/contents');
const OUTPUT_FILE = path.join(process.cwd(), 'public/posts-index.json');

/**
 * 检查目录是否存在
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    throw new Error(`Posts directory does not exist: ${dirPath}`);
  }
}

/**
 * 处理单个文章文件
 */
function processPostFile(file) {
  try {
    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);

    // 验证必要字段
    if (!data.slug || !data.title || !data.date) {
      console.warn(`\n⚠️  Missing required fields in ${file}`);
      return null;
    }

    const { slug, title, date, summary = '', category = 'uncategorized' } = data;

    return { slug, title, summary, category, date: dayjs(date).format('YYYY-MM-DD') };
  } catch (error) {
    console.error(`\n❌ Error processing file ${file}:`, error.message);
    return null;
  }
}

/**
 * 生成文章索引
 */
function generatePostsIndex() {
  try {
    console.log('🚀 Starting posts index generation...');
    ensureDirectoryExists(POSTS_DIR);

    const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith('.mdx'));

    if (files.length === 0) {
      console.warn('⚠️  No MDX files found in posts directory');
      return;
    }

    console.log(`📂 Found ${files.length} MDX files`);

    const posts = files
      .map((file) => processPostFile(file))
      .filter(Boolean)
      .sort((a, b) => b.date.localeCompare(a.date));

    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2), 'utf-8');

    console.log(`📍 Output file: ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('❌ Error generating posts index:', error.message);
    process.exit(1);
  }
}

// 执行生成索引
generatePostsIndex();
