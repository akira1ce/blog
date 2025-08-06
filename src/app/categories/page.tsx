import { getCategories } from '@/lib/posts';
import Link from 'next/link';
import { FadeInUp } from '@/components/fade-in-up';

const Page = async () => {
  const categories = await getCategories();
  return (
    <>
      <div className="mb-12 text-center text-3xl font-bold underline">Categories</div>
      <FadeInUp>
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <Link
              className="cursor-pointer rounded-md bg-blue-500/10 p-2 transition-all duration-300 hover:scale-105"
              key={category.name}
              href={`/categories/${category.name}`}
            >
              {category.name} ({category.count})
            </Link>
          ))}
        </div>
      </FadeInUp>
    </>
  );
};

export default Page;
