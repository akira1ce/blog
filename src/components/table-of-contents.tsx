'use client';

import { useTableOfContentsHighlight } from '@/hooks/use-table-of-contents-highlight';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useEffect, useState, useRef } from 'react';

/**
 * Heading structure for the table of contents
 */
export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

/**
 * Props for the TableOfContents component
 */
export interface TableOfContentsProps {
  /**
   * Custom class name for the container
   */
  className?: string;
  /**
   * Whether to show the table of contents (useful for responsive design)
   * @default true
   */
  show?: boolean;
  /**
   * Maximum heading level to include in TOC
   * @default 4
   */
  maxLevel?: number;
}

/**
 * Extract headings from the DOM and create TOC structure
 */
const extractHeadings = (maxLevel: number): TocHeading[] => {
  const headingSelector = Array.from({ length: maxLevel }, (_, i) => `h${i + 1}`).join(', ');
  const headingElements = document.querySelectorAll(headingSelector);

  return Array.from(headingElements)
    .filter((heading) => heading.id && heading.textContent)
    .map((heading) => ({
      id: heading.id,
      text: heading.textContent?.trim() || '',
      level: parseInt(heading.tagName.substring(1), 10),
    }));
};

/**
 * Table of Contents component that highlights the currently visible section
 *
 * @param props - Component props
 * @returns JSX element for the table of contents
 */
export const TableOfContents = ({
  className = '',
  show = true,
  maxLevel = 4,
}: TableOfContentsProps) => {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const { activeId, scrollToHeading } = useTableOfContentsHighlight();
  const activeItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Extract headings after component mounts
    const tocHeadings = extractHeadings(maxLevel);
    setHeadings(tocHeadings);
  }, [maxLevel]);

  useEffect(() => {
    if (activeId && activeItemRef.current) {
      const activeElement = activeItemRef.current;

      activeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeId]);

  if (!show || headings.length === 0) {
    return null;
  }

  return (
    <nav className={`toc border-fore/10 border-l p-4 ${className}`} aria-label="Table of contents">
      <div className="text-fore/70 mb-3 text-sm font-semibold tracking-wide uppercase">目录</div>
      <div className="space-y-1">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const indent = (heading.level - 1) * 12; // 12px per level

          return (
            <div
              key={heading.id}
              style={{ paddingLeft: `${indent}px` }}
              className="relative"
              ref={isActive ? activeItemRef : null}
            >
              <div
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHeading(heading.id);
                }}
                className={cn(
                  'toc-link hover:text-fore text-fore/60 block w-full cursor-pointer text-left text-sm transition-all duration-200',
                  isActive && 'text-fore',
                )}
              >
                {heading.text}
              </div>
              {isActive && (
                <motion.div
                  className="bg-fore absolute top-0 -left-4 h-full w-0.5"
                  layoutId="toc-active-indicator"
                ></motion.div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};
