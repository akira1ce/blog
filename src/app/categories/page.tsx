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
              className="bg-fore/10 hover:bg-fore/20 block cursor-pointer rounded-xl p-2 transition-all hover:scale-95"
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
