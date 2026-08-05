'use client';

import { cn } from '@/lib/utils';
import { Project } from '@/lib/projects';
import { getAccentVar } from '@/lib/colors';
import { Star, ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export const ProjectCard = ({ project, className }: ProjectCardProps) => {
  const { name, description, stars, language, languageColor, url, accent } = project;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ '--accent': getAccentVar(accent) } as React.CSSProperties}
      className={cn(
        'border-border-color bg-card relative flex flex-col gap-3 rounded-xl border p-5',
        'transition-all duration-300 ease-out',
        'hover:bg-card-hover',
        'hover:[border-color:color-mix(in_oklab,var(--accent)_45%,var(--border-color))]',
        'hover:[box-shadow:0_14px_30px_-18px_color-mix(in_oklab,var(--accent)_55%,transparent)]',
        'motion-safe:hover:-translate-y-1',
        'group',
        className,
      )}
    >
      {/* Repo name + external link icon */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-fore text-base leading-snug font-semibold tracking-tight transition-colors group-hover:[color:var(--accent)]">
          {name}
        </h3>
        <ArrowUpRight
          aria-hidden
          className={cn(
            'text-fore/25 mt-0.5 size-4 shrink-0',
            'transition-all duration-300 ease-out',
            'group-hover:[color:var(--accent)]',
            'motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5',
          )}
        />
      </div>

      {/* Description */}
      <p className="text-fore/70 line-clamp-2 text-sm leading-relaxed text-pretty">{description}</p>

      {/* Bottom row: language dot + language + stars */}
      <div className="text-fore/60 mt-auto flex items-center gap-3 pt-1 text-xs">
        <span className="flex items-center gap-1.5 font-medium">
          <span
            aria-hidden
            className="inline-block size-1.5 rounded-full"
            style={{ backgroundColor: languageColor }}
          />
          {language}
        </span>
        <span className="ml-auto flex items-center gap-1 tabular-nums">
          <Star aria-hidden className="size-3" />
          {stars}
        </span>
      </div>
    </a>
  );
};
