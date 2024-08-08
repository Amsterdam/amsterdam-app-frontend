import {getParallaxScrollingOffset} from '@/modules/city-pass/utils/getParallaxScrollingOffset'

describe('getParallaxScrollingOffset', () => {
  it('should return (windowWidth - cardWidth) if nextCardVisibleFractionOfAvailableSpace is 1', () => {
    const windowWidth = 1000
    const cardWidth = 300
    const nextCardVisibleFractionOfAvailableSpace = 1

    const result = getParallaxScrollingOffset(
      windowWidth,
      cardWidth,
      nextCardVisibleFractionOfAvailableSpace,
    )

    expect(result).toBe(700)
  })

  it('should return half of (windowWidth - cardWidth) if nextCardVisibleFractionOfAvailableSpace is 0', () => {
    const windowWidth = 1000
    const cardWidth = 300
    const nextCardVisibleFractionOfAvailableSpace = 0

    const result = getParallaxScrollingOffset(
      windowWidth,
      cardWidth,
      nextCardVisibleFractionOfAvailableSpace,
    )

    expect(result).toBe(350)
  })

  it('should return 0 if windowWidth and cardWidth are equal', () => {
    const windowWidth = 300
    const cardWidth = 300
    const nextCardVisibleFractionOfAvailableSpace = 0.2

    const result = getParallaxScrollingOffset(
      windowWidth,
      cardWidth,
      nextCardVisibleFractionOfAvailableSpace,
    )

    expect(result).toBe(0)
  })
})
