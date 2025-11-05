import {getFillColor} from '@/components/features/map/utils/getFillColor'

describe('getFillColor', () => {
  it('should return red with given opacity.', () => {
    const result1 = getFillColor('red', 1)
    const result2 = getFillColor('blue', 0.5)
    const result3 = getFillColor('green', 0)

    expect(result1).toBe('rgba(255, 0, 0, 1)')
    expect(result2).toBe('rgba(0, 0, 255, 0.5)')
    expect(result3).toBe('rgba(0, 255, 0, 0)')
  })

  it('should return fill if not red, blue or green, regardless of given opacity', () => {
    const result1 = getFillColor('pink', 0.5)
    const result2 = getFillColor('purple', 0.5)
    const result3 = getFillColor('test', 0.5)

    expect(result1).toBe('pink')
    expect(result2).toBe('purple')
    expect(result3).toBe('test')
  })
})
