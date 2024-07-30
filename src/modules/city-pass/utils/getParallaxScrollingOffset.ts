export const getParallaxScrollingOffset = (
  windowWidth: number,
  cardWidth: number,
  nextCardVisibleFractionOfAvailableSpace: number,
) =>
  (windowWidth - cardWidth) *
  0.5 * // because only the available space on 1 side of the card should be calculated
  (1 + nextCardVisibleFractionOfAvailableSpace)
