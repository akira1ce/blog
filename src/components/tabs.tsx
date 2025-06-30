'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { FadeInUp } from './fade-in-up';

export interface TabItemProps {
  label: string;
  children: React.ReactNode;
}

export const TabItem = ({ children }: TabItemProps) => children;

export interface TabsProps {
  children: React.ReactNode;
}

export const Tabs = ({ children }: TabsProps) => {
  const tabs = Array.isArray(children) ? children : [children];

  const [activeTab, setActiveTab] = useState(() => tabs[0]?.props?.label || '');

  return (
    <div>
      <div className="flex items-center gap-2">
        {tabs.map((child: any) => {
          const label = child.props.label;
          const isActive = activeTab === label;
          return (
            <div
              key={label}
              onClick={() => setActiveTab(label)}
              className={cn(
                'relative cursor-pointer rounded-md px-2 py-1 transition-colors',
                isActive ? 'font-bold' : 'font-normal hover:bg-gray-100/50',
              )}
            >
              {label}
              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-0 h-full w-full rounded-md bg-gray-200/20"
                  layoutId="tab-active"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="-mt-4">
        {tabs.map((child: any) =>
          child.props.label === activeTab ? (
            <FadeInUp key={child.props.label}>{child.props.children}</FadeInUp>
          ) : null,
        )}
      </div>
    </div>
  );
};
