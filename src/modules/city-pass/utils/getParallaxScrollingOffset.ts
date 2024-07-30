import {NEXT_CARD_VISIBLE_FRACTION_Of_AVAILABLE_SPACE} from '@/modules/city-pass/constants'

export const getParallaxScrollingOffset = (
  windowWidth: number,
  passWidth: number,
) =>
  (windowWidth - passWidth) *
  (1 - 0.5 * NEXT_CARD_VISIBLE_FRACTION_Of_AVAILABLE_SPACE)
