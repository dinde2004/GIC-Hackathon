/**
 * Converts a snake_case string to a user-friendly format.
 *
 * @param name - The snake_case string to be converted.
 * @returns A string with underscores replaced by spaces, the first letter capitalized, and the rest in lowercase.
 *
 * Example:
 * Input: "hello_world"
 * Output: "Hello world"
 */

export function toUserFriendlyName(name: string) {
  const tmp = name.replace(/_/g, " ");
  return tmp.charAt(0).toUpperCase() + tmp.slice(1).toLowerCase();
}

/**
 * Capitalizes the first letter of each word in a string.
 *
 * @param string - The string to be converted.
 * @returns A string with the first letter of each word capitalized and the rest in lowercase.
 *
 * Example:
 * Input: "hello world"
 * Output: "Hello World"
 */

export function capitalizeFirstLetter(string: string) {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Formats a number as a price with a dollar sign.
 *
 * @param price - The price number to be formatted.
 * @returns A string representing the price formatted with a dollar sign.
 *
 * Example:
 * Input: 1000
 * Output: "$1000"
 */

export function formatPriceToThousand(price: number) {
  const formattedPrice = price;
  return `$${formattedPrice}`;
}
