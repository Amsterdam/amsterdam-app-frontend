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
 * Check whether the input is an error object
 */
export const isErrorObject = (maybeError: unknown) =>
  maybeError?.constructor === Error

/**
 * Get the value of a specific property of an object, first checking if it actually is an object. This is useful for error handling when it is not certain what the type or content of the error is. We can use this to prevent use of TS trickery and casting in our error handling functions.
 */
export const getPropertyFromMaybeError = <T>(
  maybeError: unknown,
  property: string,
) => {
  if (!isErrorObject(maybeError)) {
    return
  }

  return (maybeError as Record<string, unknown>)[property] as T
}

/**
 * Filters out properties that are undefined from an object
 */
export const filterOutUndefinedProperties = <
  T extends string | number | symbol,
  S,
>(
  input: Partial<Record<T, S | undefined>> | undefined,
): Record<T, S> | undefined => {
  if (input) {
    return (Object.keys(input) as T[])
      .filter(key => input[key] !== undefined)
      .reduce<
        Record<T, S>
      >((acc, key) => ({...acc, [key]: input[key]}), {} as Record<T, S>)
  }

  return input
}
