import {getCollectionPointsMapUrl} from '@/modules/waste-guide/utils/getCollectionPointsMapUrl'

describe('getCollectionPointsMapUrl', () => {
  it('should return the correct URL when coordinates are provided', () => {
    const url = 'https://url.com'
    const coordinates = {lat: 51.12345, lon: -0.98765}
    const expectedUrl = `${url}/#13/51.12345/-0.98765/brt/26795///51.12345,-0.98765`

    const result = getCollectionPointsMapUrl(url, coordinates)

    expect(result).toBe(expectedUrl)
  })
})

it('should return a fallback URL when no coordinates are provided', () => {
  const expectedUrl = `https://url.com/#13/0.00000/0.00000/brt/26795///0.00000,0.00000`

  const result = getCollectionPointsMapUrl('https://url.com', undefined)

  expect(result).toBe(expectedUrl)
})
