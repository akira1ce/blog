import typesData from '@/../public/bookmarks/types.json';
import sitesData from '@/../public/bookmarks/sites.json';

export interface BookmarkType {
  id: string;
  name: string;
  icon: string;
  order: number;
}

export interface Bookmark {
  id: string;
  name: string;
  url: string;
  description: string;
  type: string;
  tags: string[];
}

export interface BookmarksByType {
  type: BookmarkType;
  sites: Bookmark[];
}

export function getAllTypes(): BookmarkType[] {
  return typesData.sort((a, b) => a.order - b.order);
}

export function getAllBookmarks(): Bookmark[] {
  return sitesData;
}

export function getBookmarksByType(): BookmarksByType[] {
  const types = getAllTypes();
  const bookmarks = getAllBookmarks();

  return types.map((type) => ({
    type,
    sites: bookmarks.filter((bookmark) => bookmark.type === type.id),
  }));
}

export function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  } catch {
    return '';
  }
}
