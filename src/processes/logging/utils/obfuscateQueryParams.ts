export const obfuscateQueryParams = (str?: string) => {
  if (!str) {
    return str
  }

  // Replace all query param values (plain and encoded)
  // Matches: ?foo=bar&baz=qux or &foo=bar
  return str
    .replace(/([?&][^=&#]+)=([^&#]*)/g, '$1=***')
    .replace(/(%3F|%26)([^=&#]+)%3D([^&#]*)/gi, '$1$2%3D***')
}
