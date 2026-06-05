const accentMap = ['sky', 'violet', 'amber', 'rose', 'emerald'] as const;
export type AccentColor = (typeof accentMap)[number];

/**
 * Deterministically map a category string to an accent color.
 * Uses a simple hash so the same category always gets the same color.
 */
export function getAccentForCategory(category: string): AccentColor {
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  return accentMap[Math.abs(hash) % accentMap.length];
}

/**
 * Get the Tailwind text color class for a given accent color.
 */
export function getAccentTextClass(accent: AccentColor): string {
  return `text-accent-${accent}`;
}

/**
 * Get the Tailwind border color class for a given accent color.
 */
export function getAccentBorderClass(accent: AccentColor): string {
  return `border-accent-${accent}`;
}

/**
 * Get the Tailwind background color class for a given accent color.
 */
export function getAccentBgClass(accent: AccentColor): string {
  return `bg-accent-${accent}`;
}
