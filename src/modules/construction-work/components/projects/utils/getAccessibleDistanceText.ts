const isNotNullish = <T>(maybeNullish: unknown): maybeNullish is T =>
  maybeNullish !== undefined && maybeNullish !== null

export const getAccessibleDistanceText = (
  meter?: number | null,
  strides?: number | null,
) => {
  const hasMeters = isNotNullish<number>(meter)
  const hasStrides = isNotNullish<number>(strides)

  if (!hasMeters && !hasStrides) {
    return
  }

  const textParts = ['vanaf uw adres']

  if (hasStrides) {
    textParts.unshift(`${strides} stappen`)
  }

  if (hasMeters) {
    if (hasStrides) {
      textParts.unshift('of')
    }

    textParts.unshift(`${meter} meter`)
  }

  return textParts.join(' ')
}
