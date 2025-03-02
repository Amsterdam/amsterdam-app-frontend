import {parse, stringify} from 'picoquery'

/**
 * Takes a query string and replaces all values with `___`. E.g. `foo=bar&quux=1` becomes `?foo=___&quux=___`
 */
export const getSanitizedQueryString = (query?: string): string => {
  if (!query) {
    return ''
  }

  const sanitizedQueryParams: Record<string, string> = {}

  Object.keys(parse(query)).forEach(key => {
    sanitizedQueryParams[key] = '___'
  })

  return `?${stringify(sanitizedQueryParams)}`
}

/**
 * Takes a hash string and replaces all values with `___`. E.g. `foo/bar/quux` becomes `#___/___/___`
 */
export const getSanitizedHashString = (hash?: string): string => {
  if (!hash) {
    return ''
  }

  return `#${hash
    .split('/')
    .map(() => '___')
    .join('/')}`
}

/**
 * Takes a URL and sanitizes it if it contains a query string and/or hash, i.e., replaces the values with `___`
 */
export const sanitizeUrl = (url = ''): string => {
  const [urlWithoutHash, hash, ...additionalHashes] = url.split('#')
  const [baseUrl, query, ...additionalQueries] = urlWithoutHash.split('?')

  if (additionalHashes.length || additionalQueries.length) {
    return baseUrl
  }

  const sanitizedQuery = getSanitizedQueryString(query)
  const sanitizedHash = getSanitizedHashString(hash)

  return `${baseUrl}${sanitizedQuery}${sanitizedHash}`
}
