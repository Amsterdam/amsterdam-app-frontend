import {isNotNullish} from '@/utils/isNotNullish'

export const getAccessibleDistanceText = (meter?: number | null) => {
  const hasMeters = isNotNullish<number>(meter)

  if (!hasMeters) {
    return
  }

  const textParts = ['vanaf uw adres']

  if (hasMeters) {
    textParts.unshift(`${meter} meter`)
  }

  return textParts.join(' ')
}
