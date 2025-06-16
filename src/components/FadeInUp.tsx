'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface FadeInUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export const FadeInUp = ({
  children,
  className = '',
  delay = 0,
  duration = 0.3,
}: FadeInUpProps) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration, delay, type: 'spring', stiffness: 80 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
