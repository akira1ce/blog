import { FadeInUp } from '@/components/FadeInUp';
import Image from 'next/image';

const Page = () => {
  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col items-center justify-center gap-4">
      <FadeInUp>
        <Image className="rounded-full" src="/avatar.jpg" alt="Akira1ce" width={100} height={100} />
      </FadeInUp>
      <FadeInUp className="text-2xl font-bold text-gray-900 dark:text-gray-100" delay={0.5}>
        I'm Akira1ce 👋🏻
      </FadeInUp>
      <FadeInUp className="text-md text-gray-500 dark:text-gray-400" delay={0.75}>
        A web developer · Lifelong learner · CS enthusiasts
      </FadeInUp>
      <FadeInUp className="mt-4 text-sm text-gray-400 dark:text-gray-500" delay={1}>
        💡 点击右上角按钮切换暗色模式
      </FadeInUp>
    </div>
  );
};

export default Page;
