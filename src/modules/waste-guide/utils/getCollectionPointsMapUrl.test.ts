import {WasteGuideUrl} from '@/modules/waste-guide/types'
import {getCollectionPointsMapUrl} from '@/modules/waste-guide/utils/getCollectionPointsMapUrl'

describe('getCollectionPointsMapUrl', () => {
  it('should return the correct URL when coordinates are provided', () => {
    const centroid: [number, number] = [0, 0]
    const coordinates = {lat: 51.12345, lon: -0.98765}
    const expectedUrl = `${WasteGuideUrl.collectionPointsUrl}/#13/51.12345/-0.98765/brt/14324///51.12345,-0.98765`

    const result = getCollectionPointsMapUrl(centroid, coordinates)

    expect(result).toBe(expectedUrl)
  })

  it('should return the correct URL when coordinates are not provided but centroid is', () => {
    const centroid: [number, number] = [10, 20]
    const expectedUrl = `${WasteGuideUrl.collectionPointsUrl}/#13/20.00000/10.00000/brt/14324///20.00000,10.00000`

    const result = getCollectionPointsMapUrl(centroid, undefined)

    expect(result).toBe(expectedUrl)
  })

  it('should return the correct URL when neither coordinates nor centroid are provided', () => {
    const expectedUrl = `${WasteGuideUrl.collectionPointsUrl}/#13/0.00000/0.00000/brt/14324///0.00000,0.00000`

    const result = getCollectionPointsMapUrl(undefined, undefined)

    expect(result).toBe(expectedUrl)
  })
})
