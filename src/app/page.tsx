import { FadeInUp } from '@/components/fade-in-up';
import Image from 'next/image';

const Page = () => {
  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col items-center justify-center gap-4">
      <FadeInUp>
        <Image className="rounded-full" src="/avatar.jpg" alt="Akira1ce" width={120} height={120} />
      </FadeInUp>
      <FadeInUp className="text-2xl font-bold text-gray-900 dark:text-gray-100" delay={0.5}>
        I'm Akira1ce 👋🏻
      </FadeInUp>
      <FadeInUp className="text-md text-gray-500 dark:text-gray-400" delay={0.75}>
        A web developer · Lifelong learner · CS enthusiasts
      </FadeInUp>
    </div>
  );
};

export default Page;
