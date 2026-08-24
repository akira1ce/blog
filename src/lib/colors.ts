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

/**
 * Accent for list positions, cycled. Bookmark folders come from the gist with
 * generated ids, so there is nothing stable to key an explicit map on.
 */
export function accentByIndex(index: number): AccentColor {
  return accentMap[index % accentMap.length];
}
