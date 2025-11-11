import type {LatLng} from 'react-native-maps'
import {getRegionFromCoords} from '@/components/features/map/utils/getRegionFromCoords'

describe('getRegionFromCoords', () => {
  it('should return undefined if length of coords is 0.', () => {
    const mockCoords: LatLng[] = []

    const result = getRegionFromCoords(mockCoords)

    expect(result).toBeUndefined()
  })

  it('should return a region if length of coords is more than 0.', () => {
    const mockCoords1: LatLng[] = [
      {latitude: 1, longitude: 2},
      {latitude: 3, longitude: 4},
    ]

    const mockCoords2: LatLng[] = [
      {latitude: 50, longitude: 4},
      {latitude: 55, longitude: 5},
    ]

    const result1 = getRegionFromCoords(mockCoords1)
    const result2 = getRegionFromCoords(mockCoords2)

    expect(result1).toEqual({
      latitude: 2,
      longitude: 3,
      latitudeDelta: 2.4,
      longitudeDelta: 2.4,
    })
    expect(result2).toEqual({
      latitude: 52.5,
      longitude: 4.5,
      latitudeDelta: 6,
      longitudeDelta: 1.2,
    })
  })

  it('should return a region with deltas set to 0.01 if length of coords is 1.', () => {
    const mockCoords: LatLng[] = [{latitude: 52.373, longitude: 4.892}]

    const result = getRegionFromCoords(mockCoords)

    expect(result).toEqual({
      latitude: 52.373,
      longitude: 4.892,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })
  })
})
