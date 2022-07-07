export const isEmptyObject = (
  value: Record<string | number | symbol, unknown>,
) => {
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      return false
    }
  }
  return true
}

/**
 * If input is an object (including array), returns a stringified version, otherwise passes through the input as-is.
 */
export const stringifyIfObject = (input: unknown) => {
  if (typeof input === 'object' && input !== null) {
    return JSON.stringify(input)
  }
  return input
}
