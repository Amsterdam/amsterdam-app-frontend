import {getDistance} from '@/utils/getDistance'

describe('getDistance', () => {
  it('returns 0 for identical coordinates', () => {
    expect(getDistance({lat: 52.0, lon: 4.0}, {lat: 52.0, lon: 4.0})).toBe(0)
  })

  it('returns correct distance for 1 degree latitude difference', () => {
    // 1 degree latitude ~ 111,195 meters
    const d = getDistance({lat: 52.0, lon: 4.0}, {lat: 53.0, lon: 4.0})

    expect(Math.abs(d - 111195)).toBeLessThan(100)
  })

  it('returns correct distance for Amsterdam to Rotterdam', () => {
    // Amsterdam: 52.370216, 4.895168
    // Rotterdam: 51.9225, 4.47917
    const d = getDistance(
      {lat: 52.370216, lon: 4.895168},
      {lat: 51.9225, lon: 4.47917},
    )

    // Real-world distance ~57 km
    expect(d).toBeGreaterThan(56000)
    expect(d).toBeLessThan(59000)
  })

  it('returns correct distance for negative coordinates', () => {
    const d = getDistance({lat: -10, lon: -10}, {lat: -10, lon: -11})

    expect(d).toBeGreaterThan(109000)
    expect(d).toBeLessThan(112000)
  })
})
