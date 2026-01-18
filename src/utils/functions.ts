/**
 * Slices a string to a maximum length and adds ellipsis if needed.
 *
 * @param {string} txt - The original text to be sliced.
 * @param {number} max - The maximum number of characters allowed.
 * @returns {string} - The sliced text with "..." appended if it was longer than max.
 *
 * @example
 * textSlicer("Hello world, this is a test", 10);
 * // Returns: "Hello worl..."
 */
export function textSlicer(txt: string, max: number): string {
  if (txt.length <= max) {
    return txt;
  }
  return txt.slice(0, max) + '...';
}
