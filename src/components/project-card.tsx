'use client';

import { cn } from '@/lib/utils';
import { Project } from '@/lib/projects';
import { Star, ExternalLink } from 'lucide-react';

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
      className={cn(
        'bg-card hover:bg-card-hover border-border-color group relative flex flex-col gap-3 rounded-xl border p-6 transition-all duration-300',
        'hover:shadow-md',
        `border-l-accent-${accent}`,
        'border-l-2 border-l border-t border-r border-b',
        className,
      )}
    >
      {/* Repo name + external link icon */}
      <div className="flex items-center gap-2">
        <h3 className={cn('text-fore text-lg font-bold transition-colors', `group-hover:text-accent-${accent}`)}>
          {name}
        </h3>
        <ExternalLink className="text-fore/30 size-4 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      {/* Description */}
      <p className="text-fore/60 text-sm leading-relaxed">{description}</p>

      {/* Bottom row: language dot + language + stars */}
      <div className="mt-auto flex items-center gap-3 text-xs text-fore/45">
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block size-2.5 rounded-full"
            style={{ backgroundColor: languageColor }}
          />
          {language}
        </span>
        <span className="flex items-center gap-1">
          <Star className="size-3" />
          {stars}
        </span>
      </div>
    </a>
  );
};
