/**
 * Format an enumeration string. For example, 'a, b, c' becomes 'a, b en c'.
 */
export const formatEnumeration = (
  enumeration: string[] | string | null,
): string | null => {
  if (
    !enumeration ||
    (Array.isArray(enumeration) && enumeration.length === 0)
  ) {
    return null
  }

  const items = (
    Array.isArray(enumeration) ? enumeration : enumeration.split(',')
  ).map(item => item.trim())

  if (items.length > 1) {
    const lastItem = items.pop() ?? ''

    return `${items.join(', ')} en ${lastItem}`
  }

  return items.join('')
}
