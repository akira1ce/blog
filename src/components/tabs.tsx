'use client';

import { cn } from '@/lib/utils';
import React, { useId, useState } from 'react';
import { motion } from 'motion/react';
import { FadeInUp } from '@/components/fade-in-up';

export interface TabItemProps {
  label: React.ReactNode;
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
    <div className="tabs-wrapper my-4">
      <div className="bg-accent mb-4 flex w-fit max-w-full items-center gap-2 overflow-auto rounded-md border border-dashed p-1">
        {tabs.map((child: any, index) => {
          const label = child.props.label;
          const isActive = activeTab === index;

          return (
            <div
              key={`${uid}-${index}`}
              onClick={() => setActiveTab(index)}
              className="relative cursor-pointer rounded-xl px-2 py-1 text-nowrap"
            >
              {isActive && (
                <motion.div
                  className="bg-main/90 absolute inset-0 z-0 rounded-md"
                  layoutId={`${uid}-tab-active`}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className={'relative z-10 transition-colors'}>{label}</span>
            </div>
          );
        })}
      </div>

      <div>
        <FadeInUp key={activeTab} duration={0.1}>
          {tabs[activeTab]?.props.children}
        </FadeInUp>
      </div>
    </div>
  );
};
