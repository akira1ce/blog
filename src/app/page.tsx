import { FadeInUp } from '@/components/fade-in-up';
import Image from 'next/image';

const Page = async () => {
  const items = ['Web Developer', 'Lifelong Learner', 'CS Enthusiast'];

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-4xl flex-col items-center justify-center gap-6 py-12">
      <FadeInUp delay={0}>
        <Image
          className="ring-fore/10 rounded-full ring-2 transition-transform duration-300 hover:scale-105"
          src="/avatar.jpg"
          alt="Akira1ce"
          width={96}
          height={96}
          priority
        />
      </FadeInUp>

      <FadeInUp delay={0.1}>
        <h1 className="text-fore text-center text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          Akira1ce
        </h1>
      </FadeInUp>

      <FadeInUp delay={0.2}>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm md:text-base">
          {items.map((item, index) => (
            <span key={item} className="flex items-center gap-2">
              <span className="text-fore/70 hover:text-fore transition-colors duration-200">
                {item}
              </span>
              {index < items.length - 1 && <span className="text-fore/30 text-xs">•</span>}
            </span>
          ))}
        </div>
      </FadeInUp>
    </div>
  );
};

export default Page;
