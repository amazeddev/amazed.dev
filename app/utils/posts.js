export function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

// count the page number
export function pageCount(number) {
  return Math.ceil(number / 8);
}
