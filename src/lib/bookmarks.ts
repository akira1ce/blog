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
  url: string;
  typeId: string;
  typeName: string;
  subType: string;
}

export interface BookmarkData {
  bookmarks: Bookmark[];
  types: BookmarkType[];
}

/** Gist titles look like `tools.css.color - Color Generator`. */
function parseTitle(title: string): Pick<Bookmark, 'subType' | 'name'> {
  const [name = 'untitled', subType = 'uncategorized'] = title.split(' - ');
  return { subType, name };
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

/**
 * Flatten the two-level gist tree into a single list of bookmarks, each tagged
 * with its folder. Grouping back into folders is the caller's concern.
 */
export async function getBookmarkData(): Promise<BookmarkData> {
  const folders = await fetchBookmarkTree();

  const types: BookmarkType[] = [];
  const bookmarks: Bookmark[] = [];

  for (const folder of folders) {
    if (!folder.children?.length) continue;

    types.push({ id: folder.id, name: folder.title });

    for (const node of folder.children) {
      if (!node.url) continue;

      bookmarks.push({
        id: node.id,
        url: node.url,
        typeId: folder.id,
        typeName: folder.title,
        ...parseTitle(node.title),
      });
    }
  }

  bookmarks.sort((a, b) => a.subType.localeCompare(b.subType));

  return { bookmarks, types };
}

export function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  } catch {
    return '';
  }
}
