'use client';

import { cn } from '@/lib/utils';
import React, { useId, useState } from 'react';
import { motion } from 'motion/react';
import { FadeInUp } from './fade-in-up';

export interface TabItemProps {
  children: React.ReactNode;
}

export const TabItem = ({ children }: TabItemProps) => children;

export interface TabsProps {
  children: React.ReactNode;
}

export const Tabs = ({ children }: TabsProps) => {
  const tabs = Array.isArray(children) ? children : [children];

  const [activeTab, setActiveTab] = useState(0);

  const uid = useId();

  return (
    <div>
      <div className="flex items-center gap-2">
        {tabs.map((child: any, index) => {
          const label = child.props.label;
          const isActive = activeTab === index;
          return (
            <div
              key={`${uid}-${index}`}
              onClick={() => setActiveTab(index)}
              className={cn(
                'hover:bg-fore/5 relative cursor-pointer rounded-xl px-2 py-1 transition-all',
                isActive ? 'font-semibold' : 'font-normal',
              )}
            >
              {label}
              {isActive && (
                <motion.div
                  className="bg-fore/10 absolute bottom-0 left-0 h-full w-full rounded-xl"
                  layoutId={`${uid}-tab-active`}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="-mt-4">
        <FadeInUp>{tabs[activeTab]?.props.children}</FadeInUp>
      </div>
    </div>
  );
};
