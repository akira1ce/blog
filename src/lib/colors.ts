const accentMap = ['sky', 'violet', 'amber', 'rose', 'emerald', 'cyan', 'slate'] as const;
export type AccentColor = (typeof accentMap)[number];

/** Explicit category → accent color mapping. */
const CATEGORY_ACCENT: Record<string, AccentColor> = {
  Components: 'sky',
  Configuration: 'violet',
  DevTools: 'cyan',
  Development: 'rose',
  Frontend: 'amber',
  Notes: 'slate',
  Troubleshooting: 'emerald',
};

/**
 * Map a category string to an accent color name.
 * Explicit mapping wins; falls back to a deterministic hash for unknown categories.
 */
export function getAccentForCategory(category: string): AccentColor {
  if (CATEGORY_ACCENT[category]) return CATEGORY_ACCENT[category];
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  return accentMap[Math.abs(hash) % accentMap.length];
}
