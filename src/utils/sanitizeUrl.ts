/**
 * Remove query string from URL as it may contain user data
 */
export const sanitizeUrl = (url: string) => (url ? url.split('?')[0] : '')
