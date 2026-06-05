import type { AccentColor } from './colors';

export interface Project {
  name: string;
  description: string;
  stars: number;
  language: string;
  languageColor: string;
  url: string;
  accent: AccentColor;
}

export const projects: Project[] = [
  {
    name: 'r-hooks',
    description: 'A collection of practical React hooks for common development patterns.',
    stars: 0,
    language: 'TypeScript',
    languageColor: '#3178c6',
    url: 'https://github.com/akira1ce/r-hooks',
    accent: 'sky',
  },
  {
    name: 'react-vite-template',
    description: 'A modern React + Vite starter template with best practices built in.',
    stars: 0,
    language: 'TypeScript',
    languageColor: '#3178c6',
    url: 'https://github.com/akira1ce/react-vite-template',
    accent: 'violet',
  },
  {
    name: 'html2pdf',
    description: 'Convert HTML content to PDF documents with ease.',
    stars: 0,
    language: 'JavaScript',
    languageColor: '#f1e05a',
    url: 'https://github.com/akira1ce/html2pdf',
    accent: 'amber',
  },
  {
    name: 'sonaro',
    description: 'A tool for audio visualization and sonification.',
    stars: 0,
    language: 'TypeScript',
    languageColor: '#3178c6',
    url: 'https://github.com/akira1ce/sonaro',
    accent: 'emerald',
  },
];
