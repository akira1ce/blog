const accentMap = [
  'sky',
  'violet',
  'amber',
  'rose',
  'emerald',
  'cyan',
  'slate',
  'neutral',
] as const;
export type AccentColor = (typeof accentMap)[number];

/** Fallback accent for anything without an explicit mapping. */
export const DEFAULT_ACCENT: AccentColor = 'neutral';

/** Post category → accent color. */
export const CATEGORY_ACCENT: Record<string, AccentColor> = {
  Components: 'sky',
  Configuration: 'violet',
  DevTools: 'cyan',
  Development: 'rose',
  Frontend: 'amber',
  Notes: 'slate',
  Troubleshooting: 'emerald',
};

/** Bookmark type id → accent color. */
export const BOOKMARK_ACCENT: Record<string, AccentColor> = {
  'dev-tools': 'cyan',
  design: 'rose',
  learning: 'amber',
  productivity: 'emerald',
};
