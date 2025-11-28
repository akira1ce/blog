import { getCategories } from '@/lib/posts';
import Link from 'next/link';
import { FadeInUp } from '@/components/fade-in-up';

const Page = async () => {
  const categories = await getCategories();
  return (
    <>
      <div className="mb-12 text-center text-3xl font-bold underline">Categories</div>
      <div className="flex flex-wrap gap-4">
        {categories.map((category, index) => (
          <FadeInUp key={category.name} delay={index * 0.05}>
            <Link
              className="bg-card border-fore/5 block cursor-pointer rounded-xl border p-2 py-1 transition-all hover:scale-95 hover:font-bold"
              href={`/categories/${category.name}`}
            >
              {category.name} ({category.count})
            </Link>
          </FadeInUp>
        ))}
      </div>
    </>
  );
};

export default Page;
