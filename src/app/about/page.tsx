import { FadeInUp } from '@/components/fade-in-up';
import { Icon } from '@iconify/react';
import Image from 'next/image';

const iconSize = 18;

const Page = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* 防止 FadeInUp 抖动 导致页面每次刷新会向下滚动一定距离 */}
      <p style={{ visibility: 'hidden' }}>--------------------------------</p>
      <div className="space-y-12">
        {/* Header */}
        <FadeInUp>
          <div className="space-y-4 text-center">
            <Image
              className="m-auto mb-4 rounded-full"
              src="/avatar.jpg"
              alt="Akira1ce"
              width={120}
              height={120}
            />

            <h1 className="text-fore text-4xl font-bold">
              👋 Hi, I'm <span className="text-blue-500">Akira1ce</span>
            </h1>
            <p className="text-fore/80 text-xl">a web developer 🧑‍💻</p>
          </div>
        </FadeInUp>

        {/* Main Content */}
        <FadeInUp delay={0.5}>
          <div className="space-y-8">
            {/* About Me */}
            <section className="space-y-4">
              <h2 className="text-fore text-2xl font-bold">关于我</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-fore/80 leading-relaxed">
                  我是 Akira1ce，一个 Web 开发者，喜欢 Coding 和电子游戏（尤其是CS2）。
                </p>
              </div>
            </section>

            {/* Tech Stack */}
            <section className="space-y-4">
              <h2 className="text-fore text-2xl font-bold">技术栈</h2>
              <div className="space-y-6">
                <h3 className="text-fore mb-2 text-lg font-semibold">前端</h3>

                <p className="text-fore/80 flex items-center gap-2 leading-relaxed">
                  <Icon icon="skill-icons:html" width={iconSize} />
                  HTML
                  <Icon icon="skill-icons:css" width={iconSize} />
                  CSS
                  <Icon icon="skill-icons:javascript" width={iconSize} />
                  JavaScript 熟练使用。
                </p>

                <p className="text-fore/80 flex items-center gap-2 leading-relaxed">
                  <Icon icon="skill-icons:typescript" width={iconSize} />
                  TypeScript 会各种体操，偶尔也会 any。
                </p>

                <p className="text-fore/80 flex items-center gap-2 leading-relaxed">
                  <Icon icon="skill-icons:tailwindcss-dark" width={iconSize} />
                  TailwindCSS
                  <Icon icon="skill-icons:sass" width={iconSize} />
                  Sass
                  <Icon icon="skill-icons:emotion" width={iconSize} />
                  Emotion 随心情使用。
                </p>

                <p className="text-fore/80 flex items-center gap-2 leading-relaxed">
                  <Icon icon="skill-icons:react-dark" width={iconSize} />
                  React
                  <Icon icon="skill-icons:vuejs-dark" width={iconSize} />
                  Vue 都会玩，更喜欢 R。
                </p>

                <p className="text-fore/80 flex items-center gap-2 leading-relaxed">
                  <Icon icon="skill-icons:nuxtjs-dark" width={iconSize} />
                  NuxtJS
                  <Icon icon="skill-icons:nextjs-dark" width={iconSize} />
                  NextJS 会做服务端渲染，做不来高并发。
                </p>

                <p className="text-fore/80 flex items-center gap-2 leading-relaxed">
                  <Icon icon="skill-icons:webpack-dark" width={iconSize} />
                  Webpack
                  <Icon icon="skill-icons:rollupjs-dark" width={iconSize} />
                  RollupJS
                  <Icon icon="skill-icons:vite-dark" width={iconSize} />
                  Vite 会写配置和插件，没看过源码。
                </p>

                <h3 className="text-fore mb-2 text-lg font-semibold">后端</h3>

                <p className="text-fore/80 flex items-center gap-2 leading-relaxed">
                  <Icon icon="skill-icons:expressjs-dark" width={iconSize} />
                  ExpressJS
                  <Icon icon="skill-icons:nextjs-dark" width={iconSize} />
                  NextJS 能写 CURD 水平。
                </p>

                <p className="text-fore/80 flex items-center gap-2 leading-relaxed">
                  <Icon icon="skill-icons:docker" width={iconSize} />
                  会用 docker-compose; docker-compose up -d;
                </p>

                <p className="text-fore/80 flex items-center gap-2 leading-relaxed">
                  <Icon icon="skill-icons:nginx" width={iconSize} />
                  会配置代理、HTTP、HTTPS。
                </p>
              </div>
            </section>
          </div>
        </FadeInUp>

        {/* Footer */}
        <div className="pt-8 text-center">
          <p className="text-fore/60">「 放弃和认命，是一条没有尽头的下坡路 」</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
