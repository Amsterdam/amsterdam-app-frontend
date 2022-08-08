export const getAccessibleDistanceText = (meter?: number, strides?: number) => {
  if (meter === undefined && strides === undefined) {
    return
  }

  const textParts = ['vanaf uw adres']

  if (strides !== undefined) {
    textParts.unshift(`${strides} stappen`)
  }

  if (meter !== undefined) {
    if (strides !== undefined) {
      textParts.unshift('of')
    }
    textParts.unshift(`${meter} meter`)
  }

  return textParts.join(' ')
}
