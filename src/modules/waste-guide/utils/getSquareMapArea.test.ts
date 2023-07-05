import {getSquareMapArea} from './getSquareMapArea'

describe('getSquareMapArea', () => {
  it('should return a string representation of two coordinates by offsetting a coordinate with an amount of degrees', () => {
    const lat = 40
    const lon = -73
    const offset = 10
    expect(getSquareMapArea(lat, lon, offset)).toBe('30/-83/50/-63')
  })

  it('should handle negative latitude and longitude', () => {
    const lat = -40
    const lon = -73
    const offset = 10
    expect(getSquareMapArea(lat, lon, offset)).toBe('-50/-83/-30/-63')
  })

  it('should handle zero offset', () => {
    const lat = 40
    const lon = -73
    const offset = 0
    expect(getSquareMapArea(lat, lon, offset)).toBe('40/-73/40/-73')
  })

  it('should handle floating point numbers', () => {
    const lat = 40.75
    const lon = -73.99
    const offset = 0.5
    expect(getSquareMapArea(lat, lon, offset)).toBe('40.25/-74.49/41.25/-73.49')
  })
})
