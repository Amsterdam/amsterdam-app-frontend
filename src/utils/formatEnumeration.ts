/**
 * Format an enumeration string. For example, 'a, b, c' becomes 'a, b en c'.
 */
export const formatEnumeration = (
  enumeration: string | null,
): string | null => {
  if (!enumeration) {
    return null
  }

  const items = enumeration.split(',').map(item => item.trim())

  if (items.length > 1) {
    const lastItem = items.pop() ?? ''

    return `${items.join(', ')} en ${lastItem}`
  }

  return enumeration
}
