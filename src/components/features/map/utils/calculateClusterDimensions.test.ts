import {calculateClusterDimensions} from '@/components/features/map/utils/calculateClusterDimensions'

describe('calculateClusterDimensions', () => {
  it('should return an integer.', () => {
    const count = 2
    const result = calculateClusterDimensions(count)

    expect(result).toBe(44)
  })

  it('should return a higher number when count is more than 10 as compared to a number less than 10.', () => {
    const result1 = calculateClusterDimensions(2)
    const result2 = calculateClusterDimensions(12)

    expect(result2).toBeGreaterThan(result1)
    expect(result2).toBe(48)
  })

  it('should return a higher number when count is more than 100 as compared to a number less than 100 but more than 10.', () => {
    const result1 = calculateClusterDimensions(72)
    const result2 = calculateClusterDimensions(112)

    expect(result2).toBeGreaterThan(result1)
    expect(result2).toBe(52)
  })

  it('should return a higher number when count is more than 1000 as compared to a number less than 1000 but more than 100.', () => {
    const result1 = calculateClusterDimensions(720)
    const result2 = calculateClusterDimensions(1112)

    expect(result2).toBeGreaterThan(result1)
    expect(result2).toBe(56)
  })

  it('should return a higher number with padding.', () => {
    const padding = 12
    const result = calculateClusterDimensions(2, padding)

    expect(result).toBe(56)
  })
})
