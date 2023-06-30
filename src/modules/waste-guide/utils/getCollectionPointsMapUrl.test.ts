import {WasteGuideUrl} from '@/modules/waste-guide/types'
import {getCollectionPointsMapUrl} from '@/modules/waste-guide/utils/getCollectionPointsMapUrl'

describe('getCollectionPointsMapUrl', () => {
  it('should return the correct URL when coordinates are provided', () => {
    const coordinates = {lat: 51.12345, lon: -0.98765}
    const expectedUrl = `${WasteGuideUrl.collectionPointsUrl}/#13/51.12345/-0.98765/brt/14324///51.12345,-0.98765`

    const result = getCollectionPointsMapUrl(coordinates)

    expect(result).toBe(expectedUrl)
  })
})

it('should return a fallback URL when no coordinates are provided', () => {
  const expectedUrl = `${WasteGuideUrl.collectionPointsUrl}/#13/0.00000/0.00000/brt/14324///0.00000,0.00000`

  const result = getCollectionPointsMapUrl(undefined)

  expect(result).toBe(expectedUrl)
})
