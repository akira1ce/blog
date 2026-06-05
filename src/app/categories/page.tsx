import { getCategories } from '@/lib/posts';
import Link from 'next/link';
import { FadeInUp } from '@/components/fade-in-up';

const Page = async () => {
  const categories = await getCategories();
  return (
    <>
      <div className="mb-2 text-center text-3xl font-bold tracking-tight">Categories</div>
      <div className="bg-accent-violet mx-auto mb-12 h-0.5 w-16" />
      <div className="flex flex-wrap gap-4">
        {categories.map((category, index) => (
          <FadeInUp key={category.name} delay={index * 0.05}>
            <Link
              className="bg-card border-border-color block cursor-pointer rounded-xl border p-2 py-1 transition-all hover:bg-card-hover hover:font-bold"
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
