import {isNotNullish} from '@/utils/isNotNullish'

export const getAccessibleDistanceText = (meter?: number | null) => {
  const hasMeters = isNotNullish<number>(meter)

  if (!hasMeters) {
    return
  }

  return `${meter} meter vanaf uw adres`
}
