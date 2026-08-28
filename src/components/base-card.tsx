import { AccentColor, DEFAULT_ACCENT } from '@/lib/colors';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface BaseCardProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Accent color name (e.g., 'violet', 'sky', 'amber'). Falls back to a neutral accent.
   */
  accentColor?: AccentColor;
  /**
   * Content to render inside the card
   */
  children: ReactNode;
  /**
   * Optional wrapper element (e.g., 'a' for links)
   */
  as?: 'article' | 'div';
  /**
   * Additional className for the card
   */
  className?: string;
}

export const BaseCard = ({
  accentColor = DEFAULT_ACCENT,
  children,
  as: Component = 'article',
  className,
  style,
  ...restProps
}: BaseCardProps) => {
  return (
    <Component
      style={{ '--accent': `var(--accent-${accentColor})`, ...style } as React.CSSProperties}
      className={cn(
        'border-border-color bg-card relative flex flex-col gap-3 rounded-xl border border-dashed p-5',
        'transition-all duration-300 ease-out',
        'group-hover:bg-card-hover group-focus-visible:bg-card-hover',
        'group-hover:[border-color:color-mix(in_oklab,var(--accent)_45%,var(--border-color))]',
        'group-focus-visible:[border-color:color-mix(in_oklab,var(--accent)_45%,var(--border-color))]',
        'group-hover:[box-shadow:0_14px_30px_-18px_color-mix(in_oklab,var(--accent)_55%,transparent)]',
        'motion-safe:group-hover:-translate-y-1 motion-safe:group-focus-visible:-translate-y-1',
        className,
      )}
      {...restProps}
    >
      {children}
    </Component>
  );
};
