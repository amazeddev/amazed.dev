export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

// count the page number
export function pageCount(number: number): number {
  return Math.ceil(number / 8);
}
