/** BookmarkHub sync data, always the latest revision of the gist. */
const GIST_RAW_URL =
  'https://gist.githubusercontent.com/akira1ce/1e87d376935ce5d5dfdff019c0fda67b/raw/bookmarkhub.json';

interface GistNode {
  id: string;
  title: string;
  url?: string;
  children?: GistNode[];
}

interface GistData {
  nodes: GistNode[];
}

export interface BookmarkType {
  id: string;
  name: string;
}

export interface Bookmark {
  id: string;
  name: string;
  /** Namespace prefix from the gist title, e.g. `tools.css.color`. */
  label?: string;
  url: string;
  type: string;
}

export interface BookmarksByType {
  type: BookmarkType;
  sites: Bookmark[];
}

/** Gist titles look like `tools.css.color - Color Generator`. */
function parseTitle(title: string): { name: string; label?: string } {
  const separator = title.indexOf(' - ');
  if (separator === -1) return { name: title };

  return {
    label: title.slice(0, separator),
    name: title.slice(separator + 3),
  };
}

async function fetchBookmarkTree(): Promise<GistNode[]> {
  const res = await fetch(GIST_RAW_URL, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error(`Failed to fetch bookmarks gist: ${res.status} ${res.statusText}`);
  }

  const data: GistData = await res.json();

  /* Only the bookmarks bar is published, and it is exactly two levels deep. */
  return data.nodes[0]?.children ?? [];
}

export async function getBookmarksByType(): Promise<BookmarksByType[]> {
  const folders = await fetchBookmarkTree();

  return folders
    .filter((folder) => folder.children?.length)
    .map((folder) => ({
      type: { id: folder.id, name: folder.title },
      sites: (folder.children ?? [])
        .filter((node): node is GistNode & { url: string } => Boolean(node.url))
        .map((node) => ({
          id: node.id,
          url: node.url,
          type: folder.id,
          ...parseTitle(node.title),
        })),
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
