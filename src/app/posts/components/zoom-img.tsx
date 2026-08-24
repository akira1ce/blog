'use client';

import { useId, useState } from 'react';
import { motion } from 'motion/react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { useEventListener } from '@akira1ce/r-hooks';

export interface ZoomImgProps {
  src: string;
  alt: string;
}

const imgCls = 'border-border-color cursor-zoom-out rounded-xl border object-cover';

const ZoomImg = (props: ZoomImgProps) => {
  const id = useId();
  const [open, setOpen] = useState(false);

  useEventListener('scroll', () => open && setOpen(false));

  const isBrowser = typeof document !== 'undefined';

  return (
    <>
      {isBrowser &&
        createPortal(
          <>
            {open && (
              <div
                className="bg-main/90 fixed inset-0 z-20 flex h-screen w-screen items-center justify-center overflow-hidden"
                onClick={() => setOpen(false)}
              >
                <motion.img
                  {...props}
                  className={cn(imgCls, 'w-2/3 cursor-zoom-out')}
                  layoutId={id}
                  onClick={() => setOpen(false)}
                />
              </div>
            )}
          </>,
          document.body,
        )}
      <motion.img
        {...props}
        className={cn(imgCls, 'cursor-zoom-in')}
        layoutId={id}
        onClick={() => setOpen(true)}
      />
    </>
  );
};

export default ZoomImg;
