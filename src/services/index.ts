export const getPostsIndex = async () => {
  const res = await fetch('/posts-index.json', { cache: 'force-cache' });
  const posts = await res.json();
  return posts;
};
