export const obfuscateQueryParams = (str?: string) => {
  if (!str) {
    return str
  }

  // Replace all query param values (plain and encoded)
  // Matches: ?foo=bar&baz=qux or &foo=bar
  let result = str.replace(/([?&][^=&#]+)=([^&#]*)/g, '$1=***')

  // Also handle URL-encoded params (e.g. ?foo%3Dbar)
  result = result.replace(/([?&]|%3F|%26)([^=&#%]+)%3D([^&#]*)/gi, '$1$2%3D***')

  return result
}
