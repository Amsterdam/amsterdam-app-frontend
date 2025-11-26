import {MarkerVariant} from '@/components/features/map/marker/markers'
import {getMarkerVariant} from '@/components/features/map/utils/getMarkerVariant'

const SELECTED_MARKER = '1234'
const FAVORITE_MARKERS = [1, '2', 'test_id']

const markerVariant = getMarkerVariant(SELECTED_MARKER, FAVORITE_MARKERS)

describe('getMarkerVariant', () => {
  it('should return a regular pin if neither selected nor favorite.', () => {
    expect(markerVariant('random_id')).toBe(MarkerVariant.pin)
  })

  it('should return a selectedPin if marker is selected.', () => {
    expect(markerVariant('1234')).toBe(MarkerVariant.selectedPin)
  })

  it('should return a favoritePin if marker is not selected, but included in favoriteIds.', () => {
    expect(markerVariant('test_id')).toBe(MarkerVariant.favoritePin)
  })

  it('should return a selectedPin if marker is selected, regardless of favoriteIds.', () => {
    const variant = getMarkerVariant('1', '1')

    expect(variant('1')).toBe(MarkerVariant.selectedPin)
  })
})
