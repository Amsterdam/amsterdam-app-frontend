/**
 * Check whether a value is not nullish (i.e. not null and not undefined) and if it isn't, coerce its type
 */
export const isNotNullish = <T>(maybeNullish: unknown): maybeNullish is T =>
  maybeNullish !== undefined && maybeNullish !== null
