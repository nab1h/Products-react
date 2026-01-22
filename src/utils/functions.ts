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


/**
 * Adds a comma after the first three characters of a string or number.
 *
 * @param {string | number} value - The value to format (string or number).
 * @returns {string} The formatted value with a comma after the first three characters.
 *
 * @example
 * addCommaAfterThree(12345); // "123,45"
 * addCommaAfterThree("98765"); // "987,65"
 * addCommaAfterThree(120); // "120"
 */


export function addCommaAfterThree(value: string | number): string {
  const str = value.toString();
  if(str.length <= 3){
    return str;
  }
  return str.slice(0,3)+ "," + str.slice(3);
}

/**
 * Converts a string to uppercase.
 *
 * @param {string} txt - The text to be converted to uppercase.
 * @returns {string} The uppercase version of the input text.
 *
 * @example
 * txtUpperCase("hello"); // "HELLO"
 * txtUpperCase("Sam");   // "SAM"
 */
export function txtUpperCase(txt:string):string{
  return txt.toUpperCase();
}


export function capitalaizerFirstLetter(str:string):string{
  return str.charAt(0).toUpperCase()+str.slice(1);
}