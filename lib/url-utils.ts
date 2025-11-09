/**
 * Checks if a URL starts with http/https and prepends "http://" if not
 * @param url - The URL to check and format
 * @returns The formatted URL
 */
export function formatUrl(url: string | null | undefined): string | null {
  if (!url) return null;

  // Check if URL already starts with http:// or https://
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Prepend http:// to URLs that don't have a protocol
  return `http://${url}`;
}
