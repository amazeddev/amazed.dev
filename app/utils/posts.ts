// Shared by client and server code - keep free of node-only imports.
export const POSTS_PER_PAGE = 8;

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

// count the page number
export function pageCount(number: number): number {
  return Math.ceil(number / POSTS_PER_PAGE);
}
