'use client';

import { useMarquee } from './hooks/use-marquee';

const btnCls = 'bg-fore/3 cursor-pointer rounded-md px-2 py-1';

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Index = () => {
  const { trackRef, next, prev, pause, resume } = useMarquee({
    autoPlay: true,
    autoPlayStep: 0.3,
  });

  return (
    <div className="w-full overflow-hidden">
      <div ref={trackRef} className="mb-2 flex whitespace-nowrap">
        <div className="flex">
          {items.map((item) => (
            <span key={item} className="px-4">
              Item {item}
            </span>
          ))}
        </div>
        <div className="flex">
          {items.map((item) => (
            <span key={item} className="px-4">
              Item {item}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className={btnCls} onClick={() => prev(100)}>
          Prev
        </div>
        <div className={btnCls} onClick={() => next(100)}>
          Next
        </div>
        <div className={btnCls} onClick={pause}>
          Pause
        </div>
        <div className={btnCls} onClick={resume}>
          Resume
        </div>
      </div>
    </div>
  );
};

export default Index;
