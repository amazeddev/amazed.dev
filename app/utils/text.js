export function structText(text) {
  return text.split("\n").map((str) => <p>{str}</p>);
}
