'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { useEventListener } from '@akira1ce/r-hooks';

export interface ZoomImgProps {
  src: string;
  alt: string;
}

const imgCls = 'border-main/10 cursor-zoom-out rounded-xl border object-cover dark:invert';

// 缩放预览图片
const ZoomImg = (props: ZoomImgProps) => {
  const [open, setOpen] = useState(false);

  // 滚动缩小图片
  useEventListener('scroll', () => open && setOpen(false));

  return (
    <>
      {open &&
        createPortal(
          <div
            className="bg-main/90 fixed inset-0 z-20 flex h-screen w-screen items-center justify-center overflow-hidden"
            onClick={() => setOpen(false)}
          >
            <motion.img
              {...props}
              className={cn(imgCls, 'w-2/3 cursor-zoom-out')}
              layoutId={props.alt}
              onClick={() => setOpen(false)}
            />
          </div>,
          document.body,
        )}
      <motion.img
        {...props}
        className={cn(imgCls, 'cursor-zoom-in')}
        layoutId={props.alt}
        onClick={() => setOpen(true)}
      />
    </>
  );
};

export default ZoomImg;
