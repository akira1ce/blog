import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * Options for the table of contents highlight hook
 */
export interface UseTableOfContentsHighlightOptions {
  /**
   * Root margin for the intersection observer
   * @default '0px 0px -50% 0px'
   */
  rootMargin?: string;
  /**
   * Intersection threshold
   * @default 0.1
   */
  threshold?: number;
  /**
   * Selector for heading elements
   * @default 'h1, h2, h3, h4, h5, h6'
   */
  headingSelector?: string;
}

/**
 * A React hook that highlights table of contents items based on the currently visible heading
 */
export const useTableOfContentsHighlight = (options: UseTableOfContentsHighlightOptions = {}) => {
  const {
    rootMargin = '0px 0px -50% 0px',
    threshold = 0.1,
    headingSelector = 'h1, h2, h3, h4, h5, h6',
  } = options;

  const [activeId, setActiveId] = useState<string>('');
  const [headingElements, setHeadingElements] = useState<Element[]>([]);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Scroll to a specific heading with smooth behavior
   */
  const scrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // 立即设置目标activeId
      setActiveId(id);
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  useEffect(() => {
    // Get all heading elements that have an id
    const headings = Array.from(document.querySelectorAll(headingSelector)).filter(
      (heading) => heading.id,
    );

    setHeadingElements(headings);

    if (headings.length === 0) {
      return;
    }

    // Create intersection observer to track visible headings
    const observer = new IntersectionObserver(
      (entries) => {
        // 如果正在滚动，不更新activeId
        if (isScrollingRef.current) return;

        // Find all currently intersecting entries
        const intersectingEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            // Sort by position from top of viewport
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });
        if (intersectingEntries.length > 0) {
          // Use the topmost intersecting heading
          const topEntry = intersectingEntries[0];
          setActiveId(topEntry.target.id);
        } else {
          // If no headings are intersecting, find the closest one above the viewport
          const allEntries = entries.sort((a, b) => {
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });

          // Find the last heading that's above the viewport
          for (let i = allEntries.length - 1; i >= 0; i--) {
            const entry = allEntries[i];
            if (entry.boundingClientRect.top < 0) {
              setActiveId(entry.target.id);
              break;
            }
          }
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    // 滚动事件处理器，用于检测任何滚动行为
    const handleScroll = () => {
      // 标记正在滚动
      isScrollingRef.current = true;
      
      // 清除之前的定时器
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // 设置新的定时器，滚动停止后一段时间重新启用检测
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        // 滚动停止后，手动触发一次检测来更新activeId
        observer.disconnect();
        headings.forEach((heading) => {
          observer.observe(heading);
        });
      }, 150); // 150ms 的防抖时间
    };

    // Observe all heading elements
    headings.forEach((heading) => {
      observer.observe(heading);
    });

    // 添加滚动事件监听
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup observer on unmount
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [headingSelector, rootMargin, threshold]);

  return {
    activeId,
    scrollToHeading,
    headingElements,
  };
};
